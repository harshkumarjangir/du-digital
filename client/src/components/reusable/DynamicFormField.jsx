import React from "react";

/**
 * DynamicFormField - Renders form fields dynamically based on field type
 * Supports: text, email, number, tel, select, dropdown, checkbox, radio, textarea, date, file
 * 
 * @param {Object} field - Field configuration object
 * @param {string} field.name - Field name
 * @param {string} field.type - Field type (text, select, checkbox, radio, etc.)
 * @param {string} field.label - Field label
 * @param {string} field.placeholder - Field placeholder
 * @param {boolean} field.required - If field is required
 * @param {Array} field.options - Options for select/radio fields
 * @param {Object} formValues - Current form values
 * @param {Function} handleInputChange - Change handler function
 * @param {string} theme - 'light' or 'dark' (default: 'light')
 */
const DynamicFormField = ({
    field,
    formValues,
    handleInputChange,
    onFileChange,
    theme = 'light'
}) => {
    const isDark = theme === 'dark';

    const baseInputClass = isDark
        ? "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-gray-400 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] outline-none transition-all"
        : "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] outline-none transition-all placeholder:text-gray-500";

    const labelClass = isDark ? "text-white text-sm" : "text-gray-700 text-sm font-medium";

    switch (field.type) {
        case 'select':
        case 'dropdown':
            return (
                <div>
                    {field.label && (
                        <label htmlFor={field.name} className={`${labelClass} block mb-2`}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                    )}
                    <select
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleInputChange}
                        className={baseInputClass}
                        required={field.required}
                    >
                        <option value="">{field.placeholder || `Select ${field.label}`}</option>
                        {field.options?.map((opt, i) => (
                            <option key={i} value={opt.value || opt.label || opt}>
                                {opt.label || opt}
                            </option>
                        ))}
                    </select>
                </div>
            );

        case 'checkbox':
            return (
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name={field.name}
                        checked={formValues[field.name] || false}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-[#E31E24] border-gray-300 rounded focus:ring-[#E31E24]"
                        required={field.required}
                    />
                    <label className={labelClass}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                </div>
            );

        case 'radio':
            return (
                <div className="space-y-2">
                    <label className={`${labelClass} block mb-2`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {field.options?.map((opt, i) => (
                            <label key={i} className={`flex items-center gap-2 cursor-pointer ${labelClass}`}>
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={opt.value || opt.label || opt}
                                    checked={formValues[field.name] === (opt.value || opt.label || opt)}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#E31E24] focus:ring-[#E31E24]"
                                    required={field.required}
                                />
                                <span>{opt.label || opt}</span>
                            </label>
                        ))}
                    </div>
                </div>
            );

        case 'textarea':
            return (
                <div>
                    {field.label && (
                        <label htmlFor={field.name} className={`${labelClass} block mb-2`}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                    )}
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder || field.label}
                        className={`${baseInputClass} min-h-[100px]`}
                        required={field.required}
                    />
                </div>
            );

        case 'date':
            return (
                <div>
                    {field.label && (
                        <label className={`${labelClass} block mb-2`}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                    )}
                    <input
                        type="date"
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleInputChange}
                        className={baseInputClass}
                        required={field.required}
                    />
                </div>
            );

        case 'file':
            return (
                <div>
                    <label className={`${labelClass} block mb-2`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="file"
                        name={field.name}
                        onChange={(e) => onFileChange ? onFileChange(field.name, e.target.files[0]) : handleInputChange(e)}
                        className={`${baseInputClass} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E31E24] file:text-white hover:file:bg-red-700`}
                        required={field.required}
                    />
                </div>
            );

        default:
            // text, email, number, tel, etc.
            return (
                <div>
                    {field.showLabel && field.label && (
                        <label htmlFor={field.name} className={`${labelClass} block mb-2`}>
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                    )}
                    <input
                        id={field.name}
                        type={field.type || 'text'}
                        name={field.name}
                        value={formValues[field.name] || ''}
                        onChange={handleInputChange}
                        placeholder={field.placeholder || field.label}
                        className={baseInputClass}
                        required={field.required}
                    />
                </div>
            );
    }
};

export default DynamicFormField;
