'use strict';

var React = require('react');
var UI = require('./UI.js');
var getClassNamesForModifiers = require('./helpers/getClassNamesForModifiers.js');
var getComponents = require('./helpers/getComponents.js');
var getDataAttributes = require('./helpers/getDataAttributes.js');
var getDateLib = require('./helpers/getDateLib.js');
var getDefaultClassNames = require('./helpers/getDefaultClassNames.js');
var getFormatters = require('./helpers/getFormatters.js');
var getMonthOptions = require('./helpers/getMonthOptions.js');
var getStyleForModifiers = require('./helpers/getStyleForModifiers.js');
var getWeekdays = require('./helpers/getWeekdays.js');
var getYearOptions = require('./helpers/getYearOptions.js');
var index = require('./labels/index.js');
var useCalendar = require('./useCalendar.js');
var useDayPicker = require('./useDayPicker.js');
var useFocus = require('./useFocus.js');
var useGetModifiers = require('./useGetModifiers.js');
var useSelection = require('./useSelection.js');
var rangeIncludesDate = require('./utils/rangeIncludesDate.js');
var typeguards = require('./utils/typeguards.js');

/**
 * Render the date picker calendar.
 *
 * @group DayPicker
 * @see https://daypicker.dev
 */
function DayPicker(props) {
    const { components, formatters, labels, dateLib, classNames } = React.useMemo(() => ({
        dateLib: getDateLib.getDateLib(props.dateLib),
        components: getComponents.getComponents(props.components),
        formatters: getFormatters.getFormatters(props.formatters),
        labels: { ...index, ...props.labels },
        classNames: { ...getDefaultClassNames.getDefaultClassNames(), ...props.classNames }
    }), [
        props.classNames,
        props.components,
        props.dateLib,
        props.formatters,
        props.labels
    ]);
    const { captionLayout, firstWeekContainsDate, locale, mode, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles, useAdditionalDayOfYearTokens, useAdditionalWeekYearTokens, weekStartsOn } = props;
    const formatOptions = {
        locale,
        weekStartsOn,
        firstWeekContainsDate,
        useAdditionalWeekYearTokens,
        useAdditionalDayOfYearTokens
    };
    const labelOptions = formatOptions;
    const { formatCaption, formatDay, formatMonthDropdown, formatWeekNumber, formatWeekNumberHeader, formatWeekdayName, formatYearDropdown } = formatters;
    const calendar = useCalendar.useCalendar(props, dateLib);
    const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
    const getModifiers = useGetModifiers.useGetModifiers(days, props, dateLib);
    const { isSelected, select, selected: selectedValue } = useSelection.useSelection(props, dateLib) ?? {};
    const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus.useFocus(props, calendar, getModifiers, isSelected ?? (() => false), dateLib);
    const { labelDayButton, labelGridcell, labelGrid, labelMonthDropdown, labelNav, labelNext, labelPrevious, labelWeekday, labelWeekNumber, labelWeekNumberHeader, labelYearDropdown } = labels;
    const weekdays = React.useMemo(() => getWeekdays.getWeekdays(locale, props.weekStartsOn, props.ISOWeek, dateLib), [dateLib, locale, props.ISOWeek, props.weekStartsOn]);
    const isInteractive = mode !== undefined || onDayClick !== undefined;
    const handlePreviousClick = React.useCallback(() => {
        if (!previousMonth)
            return;
        goToMonth(previousMonth);
        onPrevClick?.(previousMonth);
    }, [previousMonth, goToMonth, onPrevClick]);
    const handleNextClick = React.useCallback(() => {
        if (!nextMonth)
            return;
        goToMonth(nextMonth);
        onNextClick?.(nextMonth);
    }, [goToMonth, nextMonth, onNextClick]);
    const handleDayClick = React.useCallback((day, m) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFocused(day);
        select?.(day.date, m, e);
        onDayClick?.(day.date, m, e);
    }, [select, onDayClick, setFocused]);
    const handleDayFocus = React.useCallback((day, m) => (e) => {
        setFocused(day);
        onDayFocus?.(day.date, m, e);
    }, [onDayFocus, setFocused]);
    const handleDayBlur = React.useCallback((day, m) => (e) => {
        blur();
        onDayBlur?.(day.date, m, e);
    }, [blur, onDayBlur]);
    const handleDayKeyDown = React.useCallback((day, modifiers) => (e) => {
        const keyMap = {
            ArrowLeft: ["day", props.dir === "rtl" ? "after" : "before"],
            ArrowRight: ["day", props.dir === "rtl" ? "before" : "after"],
            ArrowDown: ["week", "after"],
            ArrowUp: ["week", "before"],
            PageUp: [e.shiftKey ? "year" : "month", "before"],
            PageDown: [e.shiftKey ? "year" : "month", "after"],
            Home: ["startOfWeek", "before"],
            End: ["endOfWeek", "after"]
        };
        if (keyMap[e.key]) {
            e.preventDefault();
            e.stopPropagation();
            const [moveBy, moveDir] = keyMap[e.key];
            moveFocus(moveBy, moveDir);
        }
        onDayKeyDown?.(day.date, modifiers, e);
    }, [moveFocus, onDayKeyDown, props.dir]);
    const handleDayMouseEnter = React.useCallback((day, modifiers) => (e) => {
        onDayMouseEnter?.(day.date, modifiers, e);
    }, [onDayMouseEnter]);
    const handleDayMouseLeave = React.useCallback((day, modifiers) => (e) => {
        onDayMouseLeave?.(day.date, modifiers, e);
    }, [onDayMouseLeave]);
    const { className, style } = React.useMemo(() => ({
        className: [classNames[UI.UI.Root], props.className]
            .filter(Boolean)
            .join(" "),
        style: { ...styles?.[UI.UI.Root], ...props.style }
    }), [classNames, props.className, props.style, styles]);
    const dataAttributes = getDataAttributes.getDataAttributes(props);
    const contextValue = {
        selected: selectedValue,
        select: select,
        isSelected,
        months,
        nextMonth,
        previousMonth,
        goToMonth,
        getModifiers
    };
    return (React.createElement(useDayPicker.dayPickerContext.Provider, { value: contextValue },
        React.createElement(components.Root, { className: className, style: style, dir: props.dir, id: props.id, lang: props.lang, nonce: props.nonce, title: props.title, ...dataAttributes },
            React.createElement(components.Months, { className: classNames[UI.UI.Months], style: styles?.[UI.UI.Months] },
                !props.hideNavigation && (React.createElement(components.Nav, { role: "navigation", className: classNames[UI.UI.Nav], style: styles?.[UI.UI.Nav], "aria-label": labelNav() },
                    React.createElement(components.Button, { type: "button", className: classNames[UI.UI.ButtonPrevious], tabIndex: previousMonth ? undefined : -1, disabled: previousMonth ? undefined : true, "aria-label": labelPrevious(previousMonth, labelOptions), onClick: handlePreviousClick },
                        React.createElement(components.Chevron, { disabled: previousMonth ? undefined : true, className: classNames[UI.UI.Chevron], orientation: "left" })),
                    React.createElement(components.Button, { type: "button", className: classNames[UI.UI.ButtonNext], tabIndex: nextMonth ? undefined : -1, disabled: nextMonth ? undefined : true, "aria-label": labelNext(nextMonth, labelOptions), onClick: handleNextClick },
                        React.createElement(components.Chevron, { disabled: previousMonth ? undefined : true, orientation: "right", className: classNames[UI.UI.Chevron] })))),
                months.map((calendarMonth, displayIndex) => {
                    const handleMonthChange = (e) => {
                        const selectedMonth = Number(e.target.value);
                        const month = dateLib.setMonth(dateLib.startOfMonth(calendarMonth.date), selectedMonth);
                        goToMonth(month);
                    };
                    const handleYearChange = (e) => {
                        const month = dateLib.setYear(dateLib.startOfMonth(calendarMonth.date), Number(e.target.value));
                        goToMonth(month);
                    };
                    const dropdownMonths = getMonthOptions.getMonthOptions(calendarMonth.date, navStart, navEnd, formatters, locale, dateLib);
                    const dropdownYears = getYearOptions.getYearOptions(months[0].date, navStart, navEnd, formatters, dateLib);
                    return (React.createElement(components.Month, { className: classNames[UI.UI.Month], style: styles?.[UI.UI.Month], key: displayIndex, displayIndex: displayIndex, calendarMonth: calendarMonth },
                        React.createElement(components.MonthCaption, { className: classNames[UI.UI.MonthCaption], style: styles?.[UI.UI.MonthCaption], calendarMonth: calendarMonth, displayIndex: displayIndex }, captionLayout?.startsWith("dropdown") ? (React.createElement(components.DropdownNav, { className: classNames[UI.UI.Dropdowns], style: styles?.[UI.UI.Dropdowns] },
                            captionLayout === "dropdown" ||
                                captionLayout === "dropdown-months" ? (React.createElement(components.Dropdown, { "aria-label": labelMonthDropdown(), classNames: classNames, components: components, disabled: Boolean(props.disableNavigation), onChange: handleMonthChange, options: dropdownMonths, style: styles?.[UI.UI.Dropdown], value: calendarMonth.date.getMonth() })) : (React.createElement("span", { role: "status", "aria-live": "polite" }, formatMonthDropdown(calendarMonth.date.getMonth()))),
                            captionLayout === "dropdown" ||
                                captionLayout === "dropdown-years" ? (React.createElement(components.Dropdown, { "aria-label": labelYearDropdown(labelOptions), classNames: classNames, components: components, disabled: Boolean(props.disableNavigation), onChange: handleYearChange, options: dropdownYears, style: styles?.[UI.UI.Dropdown], value: calendarMonth.date.getFullYear() })) : (React.createElement("span", { role: "status", "aria-live": "polite" }, formatYearDropdown(calendarMonth.date.getFullYear()))))) : (React.createElement(components.CaptionLabel, { className: classNames[UI.UI.CaptionLabel], role: "status", "aria-live": "polite" }, formatCaption(calendarMonth.date, formatOptions, dateLib)))),
                        React.createElement(components.MonthGrid, { role: "grid", "aria-multiselectable": mode === "multiple" || mode === "range", "aria-label": labelGrid(calendarMonth.date, labelOptions, dateLib) ||
                                undefined, className: classNames[UI.UI.MonthGrid], style: styles?.[UI.UI.MonthGrid] },
                            !props.hideWeekdays && (React.createElement(components.Weekdays, { className: classNames[UI.UI.Weekdays], role: "row", style: styles?.[UI.UI.Weekdays] },
                                showWeekNumber && (React.createElement(components.WeekNumberHeader, { "aria-label": labelWeekNumberHeader(labelOptions), className: classNames[UI.UI.WeekNumberHeader], role: "columnheader", style: styles?.[UI.UI.WeekNumberHeader] }, formatWeekNumberHeader())),
                                weekdays.map((weekday, i) => (React.createElement(components.Weekday, { "aria-label": labelWeekday(weekday, labelOptions, dateLib), className: classNames[UI.UI.Weekday], key: i, role: "columnheader", style: styles?.[UI.UI.Weekday] }, formatWeekdayName(weekday, formatOptions, dateLib)))))),
                            React.createElement(components.Weeks, { className: classNames[UI.UI.Weeks], role: "rowgroup", style: styles?.[UI.UI.Weeks] }, calendarMonth.weeks.map((week, weekIndex) => {
                                return (React.createElement(components.Week, { className: classNames[UI.UI.Week], key: week.weekNumber, role: "row", style: styles?.[UI.UI.Week], week: week },
                                    showWeekNumber && (React.createElement(components.WeekNumber, { week: week, role: "rowheader", style: styles?.[UI.UI.WeekNumber], "aria-label": labelWeekNumber(week.weekNumber, {
                                            locale
                                        }), className: classNames[UI.UI.WeekNumber] }, formatWeekNumber(week.weekNumber))),
                                    week.days.map((day) => {
                                        const { date } = day;
                                        const modifiers = getModifiers(day);
                                        modifiers[UI.DayFlag.focused] =
                                            !modifiers.hidden &&
                                                Boolean(focused?.isEqualTo(day));
                                        modifiers[UI.SelectionState.selected] =
                                            !modifiers.disabled &&
                                                (isSelected?.(date) || modifiers.selected);
                                        if (typeguards.isDateRange(selectedValue)) {
                                            // add range modifiers
                                            const { from, to } = selectedValue;
                                            modifiers[UI.SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
                                            modifiers[UI.SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
                                            modifiers[UI.SelectionState.range_middle] =
                                                rangeIncludesDate.rangeIncludesDate(selectedValue, date, true, dateLib);
                                        }
                                        const style = getStyleForModifiers.getStyleForModifiers(modifiers, styles, props.modifiersStyles);
                                        const className = getClassNamesForModifiers.getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
                                        const ariaLabel = !isInteractive
                                            ? labelGridcell(date, modifiers, labelOptions, dateLib)
                                            : undefined;
                                        const dataAttributes = {
                                            "data-day": dateLib.format(date, "yyyy-MM-dd"),
                                            "data-month": day.outside
                                                ? dateLib.format(date, "yyyy-MM")
                                                : undefined
                                        };
                                        return (React.createElement(components.Day, { key: `${dateLib.format(date, "yyyy-MM-dd")}_${dateLib.format(day.displayMonth, "yyyy-MM")}`, day: day, modifiers: modifiers, role: "gridcell", className: className.join(" "), style: style, "aria-hidden": modifiers.hidden || undefined, "aria-selected": modifiers.selected || undefined, "aria-label": ariaLabel, ...dataAttributes }, isInteractive ? (React.createElement(components.DayButton, { className: classNames[UI.UI.DayButton], style: styles?.[UI.UI.DayButton], day: day, modifiers: modifiers, disabled: modifiers.disabled || undefined, tabIndex: isFocusTarget(day) ? 0 : -1, "aria-label": labelDayButton(date, modifiers, labelOptions, dateLib), onClick: handleDayClick(day, modifiers), onBlur: handleDayBlur(day, modifiers), onFocus: handleDayFocus(day, modifiers), onKeyDown: handleDayKeyDown(day, modifiers), onMouseEnter: handleDayMouseEnter(day, modifiers), onMouseLeave: handleDayMouseLeave(day, modifiers) }, formatDay(date, formatOptions, dateLib))) : (formatDay(day.date, formatOptions, dateLib))));
                                    })));
                            })))));
                })),
            props.footer && (React.createElement(components.Footer, { className: classNames[UI.UI.Footer], style: styles?.[UI.UI.Footer], role: "status", "aria-live": "polite" }, props.footer)))));
}

exports.DayPicker = DayPicker;
