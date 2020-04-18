import React from 'react';
import moment from 'moment/min/moment-with-locales';
import classNames from "classnames";
import shortid from "shortid";

const totalTablesItems = 35;

export default function Calendar(props) {
    moment.locale('ru');
    const getDaysInMonth = () => {
        return moment(props.date).daysInMonth();
    };

    const getCurrentDayNumber = () => {
        return moment(props.date).format('D');
    };

    const getCurrentDayName = () => {
        return moment(props.date).format("dddd");
    };

    const getCurrentMonthNameWithDec = () => {
        const result = moment(props.date).format("DD MMMM");
        return (result.substr(3));
    };

    const getCurrentMonthName = () => {
        return (moment(props.date).format("MMMM"));
    };

    const getCurrentYear = () => {
        return (moment(props.date).format("YYYY"));
    };

    const getFirstDayOfMonth = () => {
        const firstDay = moment(props.date)
            .startOf("month")
            .format("d");
        console.log(firstDay);
        return firstDay;
    };

    const addOtherMonthDays = (value) =>{
      return (
          <td key={shortid.generate()} className="ui-datepicker-other-month">{value}</td>
      )
    };

    const getPrevMonthDays = () => {
        let prevMonth = [];
        console.log(getFirstDayOfMonth());
        let lastDay = moment(props.date).subtract(1, 'month').daysInMonth('D');
        for (let i = getFirstDayOfMonth() - 2; i >= 0; i--) {
            console.log(i);
            prevMonth.push(addOtherMonthDays(lastDay - i));
        }
        return prevMonth;
    };

    const getCurrentMonthDays = () => {
        const currMonthDays = [];
        for (let day = 1; day <= getDaysInMonth(); day++) {
            currMonthDays.push(
                <td key={shortid.generate()}
                    className={classNames({"ui-datepicker-today": (String(day) === getCurrentDayNumber())})}>
                    {day}
                </td>
            );
        }
        return currMonthDays
    };

    const addNexMonthDays = (count) => {
        for (let i = 1; i <= count; i++) {
            total.push(addOtherMonthDays(i))
        }
    };

    const total = [...getPrevMonthDays(), ...getCurrentMonthDays()];

    if (total.length<=totalTablesItems) {
        addNexMonthDays(totalTablesItems - total.length);
    }
    let rows = [];
    let cells = [];

    total.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if (i === total.length - 1) {
            rows.push(cells);
        }
    });

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{getCurrentDayName()}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{getCurrentDayNumber()}</div>
                    <div className="ui-datepicker-material-month">{getCurrentMonthNameWithDec()}</div>
                    <div className="ui-datepicker-material-year">{}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{getCurrentMonthName()}</span>&nbsp;<span
                    className="ui-datepicker-year">{getCurrentYear()}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
                </thead>
                <tbody>
                    {rows.map(d => (<tr key={shortid.generate()}>{d}</tr>))}
                </tbody>
            </table>
        </div>
    )
}
