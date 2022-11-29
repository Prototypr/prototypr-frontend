export const FormInput = ({ children, id, label, error }) => {
  const err = error[id];

  return (
    <div className="flex flex-col gap-2">
      <label for={id} className="text-md font-medium">
        {label}
      </label>
      {children}
      {err && <span className="text-red-600 text-xs">{err}</span>}
    </div>
  );
};
