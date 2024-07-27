import { defineStore } from "pinia";
import dayjs from "dayjs";
import {
  weekDay
} from '@/pages/calendar/config'

export default defineStore("calendar", function () {

  let startDateTime = $ref<string[]>(['', ''])
  let endDateTime = $ref<string[]>(['', ''])
  let totalDayHour = $ref<number[]>([])


  function setAllDayTime(startDateTime_: string[], endDateTime_: string[], totalDayHour_: number[]) {
    startDateTime = startDateTime_;
    endDateTime = endDateTime_;
    totalDayHour = totalDayHour_;
  }

  function init() {
    startDateTime[0] = dayjs().format('YYYY-MM-DD')
    startDateTime[1] = '10:00'
    endDateTime[0] = dayjs().add(2, 'day').format('YYYY-MM-DD')
    endDateTime[1] = '10:00'
    totalDayHour[0] = 2
    totalDayHour[1] = 0
  }
  init()
  return $$({
    startDateTime,
    endDateTime,
    totalDayHour,
    setAllDayTime,
    weekDay
  });
});
