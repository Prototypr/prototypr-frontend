export const FormInput = ({ children, id, label, error }) => {
  const err = error[id];

  return (
    <div className="flex flex-col grid gap-2">
      <label for={id} className="text-md font-medium text-gray-800">
        {label}
      </label>
      {children}
      {err && <span className="text-red-600 text-sm">{err}</span>}
    </div>
  );
};
