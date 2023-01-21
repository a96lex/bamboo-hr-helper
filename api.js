import "https://deno.land/std/dotenv/load.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const urlBase = Deno.env.get("bamboo_url")

async function getTimesheet() {
    const response = await fetch("https://unith.bamboohr.com/employees/timesheet/?id=280", {
        "credentials": "include",
        "headers": {
            "User-Agent": Deno.env.get("bamboo_user_agent"),
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Cookie": Deno.env.get("bamboo_cookie")
        },
        "referrer": `https://unith.bamboohr.com/employees/timesheet/?id=${Deno.env.get("bamboo_employee_id")}`,
        "method": "GET",
        "mode": "cors"
    });
    const html = await response.text()
    const doc = new DOMParser().parseFromString(html, "text/html",);
    const p = doc.querySelector("#js-timesheet-data");
    const timeDate = JSON.parse(p.innerText)
    return timeDate.timesheet.dailyDetails
}

async function addTimeEntry({ day, start, end }) {
    await fetch(urlBase + "/timesheet/clock/entries", {
        "credentials": "include",
        "headers": {
            "User-Agent": Deno.env.get("bamboo_user_agent"),
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json;charset=utf-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "X-CSRF-TOKEN": Deno.env.get("bamboo_x_csrf_token"),
            "Cookie": Deno.env.get("bamboo_cookie")
        },
        "referrer": "https://unith.bamboohr.com/employees/timesheet/?id=" + Deno.env.get("bamboo_employee_id"),
        "body": "{\"entries\":[{\"id\":null,\"trackingId\":1,\"employeeId\":" + parseInt(Deno.env.get("bamboo_employee_id")) + ",\"date\":\"" + day + "\",\"start\":\"" + start + "\",\"end\":\"" + end + "\",\"note\":\"\",\"projectId\":null,\"taskId\":null}]}",
        "method": "POST",
        "mode": "cors"
    });
}

export default { getPastMonthTimes, addTimeEntry, getTimesheet }
