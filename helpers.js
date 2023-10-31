function parseDates(dateArray) {
    let daysToHack = [];

    for (const key in dateArray) {
        const el = dateArray[key]
        const date = new Date(key)
        const day = date.getDay()
        const today = new Date()

        // Things to check
        if (!!el.holidays.length) continue
        if (!!el.timeOff.length) continue
        if (!!el.clockEntries.length) continue
        // Note: this means we WILL clock in for today, even if the day is not
        // finished. Feel free to change this operator to >=
        if (date > today) continue
        if (day === 0 || day === 6) continue

        // If we get here we can do check-in
        if (!el.totalHours) daysToHack.push(key)
    }

    return daysToHack
}

function convert_to_time(time) {
    const hours = Math.floor(time)
    const minutes = Math.round((time - hours) * 60)
    // If not broken, why fix it?
    if (minutes === 60) {
        return `${hours + 1}`.padStart(2, "0") + ":" + "00"
    }
    return `${hours}`.padStart(2, "0") + ":" + `${minutes}`.padStart(2, "0")
}

function getRandomTimes() {
    const start_morning = (Math.random() + 8.5)
    const end_morning = (Math.random() * 0.5 + 4 + start_morning)
    const start_afternoon = (Math.random() * 0.25 + end_morning + 0.875);
    const end_afternoon = + (Math.random() * 0.5 + 3.5 + start_afternoon);
    // uncomment to ensure this is centeered around 8 hours
    // const total_worked_time = end_morning - start_morning + end_afternoon - start_afternoon
    // console.log({ total_worked_time });
    return {
        start_morning: convert_to_time(start_morning),
        end_morning: convert_to_time(end_morning),
        start_afternoon: convert_to_time(start_afternoon),
        end_afternoon: convert_to_time(end_afternoon)
    }
}

const requestConfig = {
    headers: {
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
    }
}

export default { parseDates, getRandomTimes, requestConfig }
