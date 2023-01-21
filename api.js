import "https://deno.land/std/dotenv/load.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

import helpers from "./helpers.js"

const urlBase = Deno.env.get("bamboo_url")
const employeeId = Deno.env.get("bamboo_employee_id")
const referrer = urlBase + "/employees/timesheet/?id=" + employeeId

async function getTimesheet() {
    const response = await fetch(urlBase + "/employees/timesheet/?id=" + employeeId, {
        credentials: "include",
        headers: helpers.requestConfig.headers,
        method: "GET",
        mode: "cors",
        referrer
    });
    try {
        const html = await response.text()
        const doc = new DOMParser().parseFromString(html, "text/html",);
        const p = doc.querySelector("#js-timesheet-data");
        const timeDate = JSON.parse(p.innerText)
        return timeDate.timesheet.dailyDetails
    } catch (error) {
        console.log("There was an error parsing the server's response.")
        console.log("Can you double-check yout .env variables?");
        console.log("full error", { error });
    }
}

async function addTimeEntry({ day, start, end }) {
    await fetch(urlBase + "/timesheet/clock/entries", {
        credentials: "include",
        headers: helpers.requestConfig.headers,
        body: "{\"entries\":[{\"id\":null,\"trackingId\":1,\"employeeId\":" + parseInt(employeeId) + ",\"date\":\"" + day + "\",\"start\":\"" + start + "\",\"end\":\"" + end + "\",\"note\":\"\",\"projectId\":null,\"taskId\":null}]}",
        method: "POST",
        mode: "cors",
        referrer
    });
}

export default { addTimeEntry, getTimesheet }
