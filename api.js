import "https://deno.land/std/dotenv/load.ts";

const urlBase = Deno.env.get("bamboo_url")

async function getPastMonthTimes() {
    const response = await fetch(urlBase + "/timesheet/50", {
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
        "referrer": `https://crowdmobile.bamboohr.com/employees/timesheet/?id=${Deno.env.get("bamboo_employee_id")}`,
        "method": "GET",
        "mode": "cors"
    });
    const data = await response.json()
    const res = data.timesheet.dailyDetails
    return res
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
        "referrer": "https://crowdmobile.bamboohr.com/employees/timesheet/?id=" + Deno.env.get("bamboo_employee_id"),
        "body": "{\"entries\":[{\"id\":null,\"trackingId\":1,\"employeeId\":" + parseInt(Deno.env.get("bamboo_employee_id")) + ",\"date\":\"" + day + "\",\"start\":\"" + start + "\",\"end\":\"" + end + "\",\"note\":\"\",\"projectId\":null,\"taskId\":null}]}",
        "method": "POST",
        "mode": "cors"
    });
}

export default { getPastMonthTimes, addTimeEntry }