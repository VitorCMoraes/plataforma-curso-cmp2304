interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id?: string;
    label: string;
    value: string;
    options: SelectOption[];
    disabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
}

export const Select = ({ id, label, value, options, disabled = false, error, onChange }: SelectProps) => {
    return (
        <div className="d-grid">
            <label htmlFor={id} className="form-label">{label}</label>
            <select
                id={id}
                className={`form-select mb-1 ${error ? "is-invalid" : ""}`}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Selecione...</option>
                {options.map((op) => (
                    <option key={op.value} value={op.value}>{op.label}</option>
                ))}
            </select>
            {error && <div className="invalid-feedback d-block mb-2">{error}</div>}
        </div>
    );
};