import s from '../day/day.module.css'

let lastDay = null

const Day = ({ index, day }) => {
    let result = null
    if (day === lastDay && index > 0) {
        result = null
    } else {
        lastDay = day
        result = day
    }

    if (!result || day === 'undefined') {
        return null
    }

    return (
        <div className={s.date_wrapper}>
            <div className={s.day_line}></div>
            <div className={s.day}>{result}</div>
            <div className={s.day_line} ></div>
        </div>
    )
};

export default Day;
