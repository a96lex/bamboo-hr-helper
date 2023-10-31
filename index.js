import api from "./api.js";
import helpers from "./helpers.js";

console.log("BambooHR automatic time entry");
console.log("📆 Getting past month times");

const times = await api.getTimesheet();
const days = helpers.parseDates(times);

// helper function to wait for a given number of milliseconds
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

for (const [idx, day] of days.entries()) {
    // For each day, we need to do two operations, one in the morning and one in
    // the afternoon. To mimic human behaviour, we will add a random delay of 
    // [20, 30]s between each operation
    const { start_morning, end_morning, start_afternoon, end_afternoon } = helpers.getRandomTimes();

    console.log("⏰ Clocking in and out for " + day + " from " + start_morning + " to " + end_morning);
    await api.addTimeEntry({ day, start_morning, end_morning });

    await wait(20000 + 10000 * Math.random());

    console.log("⏰ Clocking in and out for " + day + " from " + start_afternoon + " to " + end_afternoon);
    await api.addTimeEntry({ day, start_afternoon, end_afternoon });

    // No need to wait after the last day
    if (idx !== days.length - 1) {
        await wait(20000 + 10000 * Math.random());
    }
};

console.log("🎉 all done!");
