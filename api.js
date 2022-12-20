import "https://deno.land/std/dotenv/load.ts";

async function getPastMonthTimes() {
    const response = await fetch("https://crowdmobile.bamboohr.com/timesheet/50", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0",
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
    await fetch("https://crowdmobile.bamboohr.com/timesheet/clock/entries", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:107.0) Gecko/20100101 Firefox/107.0",
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