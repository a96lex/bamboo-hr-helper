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
        if (date > today) continue
        if (day === 0 || day === 6) continue

        // If we get here we can do check-in
        if (!el.totalHours) daysToHack.push(key)
    }

    return daysToHack
}

function getRandomTimes() {
    const startHour = Math.floor(Math.random() + 9.5)
    const startMinute = Math.floor(Math.random() * 30 + 30)
    const endHour = Math.floor(Math.random() + 17.5)
    const endMinute = Math.floor(Math.random() * 30 + 30)
    return {
        start: `${startHour}:${startMinute}`.padStart(5, "0"),
        end: `${endHour}:${endMinute}`.padStart(5, "0")
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
