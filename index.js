import api from "./api.js";
import helpers from "./helpers.js";

console.log("BambooHR automatic time entry");
console.log("📆 Getting past month times");

const times = await api.getTimesheet();
const days = helpers.parseDates(times);

days.forEach(async (day, idx) => {
    const { start, end } = helpers.getRandomTimes();
    setTimeout(async () => {
        console.log(
            "⏰ Clocking in and out for " + day + " from " + start + " to " + end
        );
        await api.addTimeEntry({ day, start, end });
    }, idx * (4000 + 500 * Math.random()));
});

console.log("🎉 all done!");
