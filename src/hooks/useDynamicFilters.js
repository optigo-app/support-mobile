import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for managing dynamic filter selections.
 * 
 * @param {Object} filterDefinitions - An object where keys are filter group names (e.g., 'status', 'priority') 
 *                                     and values are objects containing { title: string, options: Array }.
 * @returns {Object} { filterDefinitions, selectedFilters, totalFilters, toggleFilter, clearAllFilters }
 */
export const useDynamicFilters = (filterDefinitions) => {
    const initialSelections = useMemo(() => {
        return Object.keys(filterDefinitions).reduce((acc, key) => ({ 
            ...acc, 
            [key]: [] 
        }), {});
    }, [filterDefinitions]);

    const [selectedFilters, setSelectedFilters] = useState(initialSelections);

    // Reset state if definitions change (e.g., switching modules/pages)
    // NOTE: If filterDefinitions is stable, this effect is unnecessary. Assuming a stable definition for performance.

    // 2. Calculate the total number of active filters
    const totalFilters = useMemo(() => {
        return Object.values(selectedFilters).reduce((sum, list) => sum + list.length, 0);
    }, [selectedFilters]);

    // 3. Toggle a single filter option
    const toggleFilter = useCallback((groupKey, optionLabel) => {
        setSelectedFilters(prev => {
            const currentList = prev[groupKey] || [];
            const isSelected = currentList.includes(optionLabel);
            
            return {
                ...prev,
                [groupKey]: isSelected
                    ? currentList.filter(i => i !== optionLabel) // Remove
                    : [...currentList, optionLabel]              // Add
            };
        });
    }, []); // Dependencies are stable

    // 4. Clear all active filters
    const clearAllFilters = useCallback(() => {
        setSelectedFilters(initialSelections);
    }, [initialSelections]); // Depends on the initialSelections (which depends on filterDefinitions)

    return {
        filterDefinitions, // Pass this back to the Drawer for rendering
        selectedFilters,   // The object to be used for filtering data externally
        totalFilters,      // The count for the badge/button
        toggleFilter,      // Function to pass to Chip's onClick
        clearAllFilters,   // Function to pass to Reset button
        setSelectedFilters // Optional: for external programmatic setting
    };
};