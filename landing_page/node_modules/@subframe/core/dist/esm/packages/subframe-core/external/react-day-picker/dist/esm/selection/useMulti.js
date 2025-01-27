import React__default from 'react';

function useMulti(props, dateLib) {
    const { selected: initiallySelected, required, onSelect, mode } = props;
    const [selected, setSelected] = React__default.useState(initiallySelected);
    const { isSameDay, Date } = dateLib;
    // Update the selected date if the required flag is set.
    React__default.useEffect(() => {
        if (required && selected === undefined) {
            setSelected([new Date()]);
        }
    }, [required, selected, Date, mode]);
    // Update the selected date if the selected value from props changes.
    React__default.useEffect(() => {
        setSelected(initiallySelected);
    }, [mode, initiallySelected]);
    const isSelected = (date) => {
        return selected?.some((d) => isSameDay(d, date)) ?? false;
    };
    const { min, max } = props;
    const select = (triggerDate, modifiers, e) => {
        let newDates = [...(selected ?? [])];
        if (isSelected(triggerDate)) {
            if (selected?.length === min) {
                // Min value reached, do nothing
                return;
            }
            if (required && selected?.length === 1) {
                // Required value already selected do nothing
                return;
            }
            newDates = selected?.filter((d) => !isSameDay(d, triggerDate));
        }
        else {
            if (selected?.length === max) {
                // Max value reached, reset the selection to date
                newDates = [triggerDate];
            }
            else {
                // Add the date to the selection
                newDates = [...newDates, triggerDate];
            }
        }
        onSelect?.(newDates, triggerDate, modifiers, e);
        setSelected(newDates);
        return newDates;
    };
    return {
        selected,
        select,
        isSelected
    };
}

export { useMulti };
