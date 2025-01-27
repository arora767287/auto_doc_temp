import React__default from 'react';

function useSingle(props, dateLib) {
    const { selected: initiallySelected, required, onSelect, mode } = props;
    const [selected, setSelected] = React__default.useState(initiallySelected);
    const { isSameDay, Date, startOfDay } = dateLib;
    // Update the selected date if the required flag is set.
    React__default.useEffect(() => {
        if (required && selected === undefined) {
            setSelected(startOfDay(new Date()));
        }
    }, [required, selected, Date, startOfDay, mode]);
    // Update the selected date if the `selected` value changes.
    React__default.useEffect(() => {
        setSelected(initiallySelected);
    }, [initiallySelected]);
    const isSelected = (compareDate) => {
        return selected ? isSameDay(selected, compareDate) : false;
    };
    const select = (triggerDate, modifiers, e) => {
        let newDate = triggerDate;
        if (!required && selected && selected && isSameDay(triggerDate, selected)) {
            // If the date is the same, clear the selection.
            newDate = undefined;
        }
        setSelected(newDate);
        if (required) {
            onSelect?.(newDate, triggerDate, modifiers, e);
        }
        else {
            onSelect?.(newDate, triggerDate, modifiers, e);
        }
        return newDate;
    };
    return {
        selected,
        select,
        isSelected
    };
}

export { useSingle };
