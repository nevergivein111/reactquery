import { useForm } from "react-hook-form";

function NewEditForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const errors = formState.errors;
  return (
    <div>
      <form onSubmit={handleSubmit()}>
        <input
          type="text"
          placeholder="numNights"
          name="numNights"
          {...register("numNights", {
            required: "this field is required.",
            validate: (value) =>
              value <= getValues().maxnights ||
              "Value must be less than " + getValues().maxnights,
          })}
        />
        <div className="error"> {errors?.numNights?.message}</div>
        <input
          type="text"
          placeholder="name"
          name="name"
          {...register("name", { required: "this field is required." })}
        />
        <div className="error"> {errors?.name?.message}</div>
        <input
          type="text"
          placeholder="cabinId"
          name="cabinId"
          {...register("cabinId", { required: "this field is required." })}
        />
        <div className="error"> {errors?.cabinId?.message}</div>
        <input
          type="hidden"
          placeholder="maxnights"
          name="maxnights"
          value="20"
          {...register("maxnights")}
        />
        <input
          type="text"
          placeholder="guestId"
          name="guestId"
          {...register("guestId", { required: "this field is required." })}
        />
        <div className="error"> {errors?.guestId?.message}</div>
        <button>Add</button>
      </form>
    </div>
  );
}

export default NewEditForm;
