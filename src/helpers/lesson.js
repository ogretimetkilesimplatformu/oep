import type {LessonType} from '../screens/Student/Lesson/components/LessonItem';
import {formats} from '../components/MaterialDateTimeSelect';
import moment from 'moment';
export const getActiveLessons = (lessons: Array<LessonType>) => {
  let actives = [];
  let passives = [];

  lessons.forEach((lesson) => {
    let times = lesson.times;

    let found = times.find((time) => {
      let now = moment();

      let startTime = moment(time.startDatetime, formats.datetime);
      let endTime = moment(time.endDatetime, formats.datetime);

      return now.isBetween(startTime, endTime);
    });

    if (found) {
      actives.push(lesson);
    } else {
      passives.push(lesson);
    }
  });

  return [actives, passives];
};
