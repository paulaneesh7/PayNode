/* eslint-disable react/prop-types */
export function InputBox({ label, placeholder, value, onChange }) {
  return (
    <div>
      <div className="py-2 text-sm font-medium text-left">{label}</div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}
