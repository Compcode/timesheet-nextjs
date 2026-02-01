import { NextResponse } from "next/server";
import { WeekData } from "@/types/WeekData";

const getWeeksOfYear = (year: number): WeekData[] => {
  const weeks: WeekData[] = [];
  let weekNumber = 1;

  const current = new Date(year, 0, 1);

  // move to first Monday
  while (current.getDay() !== 1) {
    current.setDate(current.getDate() + 1);
  }

  while (current.getFullYear() === year) {
    const monday = new Date(current);
    const friday = new Date(current);
    friday.setDate(friday.getDate() + 4);

    // Stop if Friday goes to next year
    if (friday.getFullYear() !== year) break;

    const dateStr = `${monday.getDate()} - ${friday.getDate()} ${monday.toLocaleString("default", {
      month: "long",
    })}, ${year}`;

    weeks.push({
      week: weekNumber,
      date: dateStr,
      totalHrs : 0,
    });

    weekNumber++;
    current.setDate(current.getDate() + 7);
  }

  return weeks;
};

export async function GET() {
  const year = 2026;
  const data = getWeeksOfYear(year);
  return NextResponse.json(data);
}
