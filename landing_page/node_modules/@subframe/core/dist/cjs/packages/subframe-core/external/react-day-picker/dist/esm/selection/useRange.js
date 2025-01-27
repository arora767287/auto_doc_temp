'use strict';

var React = require('react');
var addToRange = require('../utils/addToRange.js');
var dateMatchModifiers = require('../utils/dateMatchModifiers.js');
var rangeIncludesDate = require('../utils/rangeIncludesDate.js');

function useRange(props, dateLib) {
    const { mode, disabled, excludeDisabled, selected: initiallySelected, required, onSelect } = props;
    const { differenceInCalendarDays } = dateLib;
    const [selected, setSelected] = React.useState(initiallySelected);
    // Update the selected date if the required flag is set.
    React.useEffect(() => {
        if (required && selected === undefined) {
            setSelected({ from: undefined, to: undefined });
        }
    }, [required, selected, mode]);
    // Update the selected date if the `selected` prop changes.
    React.useEffect(() => {
        setSelected(initiallySelected);
    }, [initiallySelected]);
    const isSelected = (date) => selected && rangeIncludesDate.rangeIncludesDate(selected, date, false, dateLib);
    const select = (triggerDate, modifiers, e) => {
        const newRange = triggerDate
            ? addToRange.addToRange(triggerDate, selected, dateLib)
            : undefined;
        const { min, max } = props;
        if (min) {
            if (newRange?.from &&
                newRange.to &&
                differenceInCalendarDays(newRange.to, newRange.from) < min - 1) {
                newRange.from = triggerDate;
                newRange.to = undefined;
            }
        }
        if (max) {
            if (newRange?.from &&
                newRange.to &&
                differenceInCalendarDays(newRange.to, newRange.from) >= max) {
                newRange.from = triggerDate;
                newRange.to = undefined;
            }
        }
        if (newRange?.from && newRange.to) {
            let newDate = newRange.from;
            while (dateLib.differenceInCalendarDays(newRange.to, newDate) > 0) {
                newDate = dateLib.addDays(newDate, 1);
                if (excludeDisabled &&
                    disabled &&
                    dateMatchModifiers.dateMatchModifiers(newDate, disabled, dateLib)) {
                    newRange.from = triggerDate;
                    newRange.to = undefined;
                    break;
                }
            }
        }
        setSelected(newRange);
        onSelect?.(newRange, triggerDate, modifiers, e);
        return newRange;
    };
    return {
        selected,
        select,
        isSelected
    };
}

exports.useRange = useRange;
