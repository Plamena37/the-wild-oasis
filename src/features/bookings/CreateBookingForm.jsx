import { useState } from "react";
import Select from "react-select";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";
import { differenceInDays, parseISO } from "date-fns";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import Textarea from "../../ui/Textarea";

import { formMessages } from "../../utils/constants";
import CreateGuestForm from "../guests/CreateGuestForm";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";

const StyledCheckbox = styled.input`
  &[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  &[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }
`;

const CreateBookingForm = ({ onCloseModal }) => {
  const [isGuestFound, setIsGuestFound] = useState(false);
  const [showCreateGuestForm, setShowCreateGuestForm] = useState(false);
  const [guest, setGuest] = useState(null);

  const { cabins, isLoading } = useCabins();

  const { guests, isLoading: isGuestsLoading } = useGuests();

  const { isCreating, createBooking } = useCreateBooking();

  const { register, handleSubmit, reset, formState, control } = useForm({
    // defaultValues: isEditSession ? editValues : {},
    defaultValues: {},
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guestsArray",
  });

  const { errors } = formState;

  const cabinOptions = cabins?.map((cabin) => {
    return {
      value: cabin.id,
      label: cabin.name + " - " + "max capacity: " + cabin.maxCapacity,
    };
  });

  // const isWorking = isCreating || isUpdating;

  if (isLoading || isGuestsLoading) return <Spinner />;

  const onSubmit = (data) => {
    const newBooking = (({
      startDate,
      endDate,
      status,
      hasBreakfast,
      isPaid,
      observations,
    }) => ({
      startDate,
      endDate,
      numNights: duration(data.startDate, data.endDate),
      numGuests: data.guestsArray.length + 1,
      cabinPrice: cabins.find((cabin) => cabin.id === data.cabinId.value)
        .regularPrice,
      extrasPrice: Number(data.extrasPrice),
      totalPrice:
        cabins.find((cabin) => cabin.id === data.cabinId.value).regularPrice +
        Number(data.extrasPrice),
      status,
      hasBreakfast,
      isPaid,
      observations,
      cabinId: data.cabinId.value,
      guestId: guests.find(
        (guest) => guest.fullName.toUpperCase() === data.fullName.toUpperCase()
      )?.id,
    }))(data);
    console.log(data);
    createBooking(newBooking, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  };

  const onSubmitGuest = (data) => {
    setIsGuestFound(
      guests.some(
        (guest) => guest.fullName.toUpperCase() === data.fullName.toUpperCase()
      )
    );
    if (isGuestFound)
      setGuest(
        guests.find(
          (guest) =>
            guest.fullName.toUpperCase() === data.fullName.toUpperCase()
        )
      );
    else {
      setShowCreateGuestForm(true);
      setGuest({ fullName: data.fullName });
    }
  };

  const duration = (startDate, endDate) => {
    return differenceInDays(parseISO(endDate), parseISO(startDate));
  };

  return (
    <>
      {!showCreateGuestForm && (
        <Form
          type={onCloseModal ? "modal" : "regular"}
          onSubmit={handleSubmit(onSubmitGuest)}
          style={{
            maxHeight: "90%",
            overflowY: "auto",
          }}
        >
          <FormRow label="Guest full name" error={errors?.startDate?.message}>
            <Input
              type="text"
              id="fullName"
              disabled={isCreating}
              {...register("fullName")}
            />
          </FormRow>
          <FormRow>
            <Button
              $variation="secondary"
              type="reset"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button
            // disabled={isCreating}
            >
              Lookup guest
            </Button>
          </FormRow>
        </Form>
      )}
      {showCreateGuestForm && !isGuestFound && (
        <CreateGuestForm
          guest={guest}
          handleGuest={setGuest}
          onCloseModal={onCloseModal}
          handleIsGuestFound={setIsGuestFound}
        />
      )}
      {isGuestFound && (
        <Form
          onSubmit={handleSubmit(onSubmit)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              defaultValue={guest?.fullName}
              {...register("fullName", {
                required: formMessages.requiredField,
              })}
            />
          </FormRow>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "26.5rem 1fr 1fr",
              paddingTop: "1.2rem",
              paddingBottom: "1.2rem",
            }}
          >
            <label
              htmlFor="guestsArray"
              // style={{ width: "100%" }}
            >
              Additional guests
            </label>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {fields.map((field, index) => {
                return (
                  <li
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                    key={field.id}
                  >
                    <Input
                      type="text"
                      id="guestsArray"
                      disabled={isCreating}
                      {...register(`guestsArray.${index}.fullName`)}
                    />
                    {index > -1 && (
                      <Button
                        $variation="secondary"
                        size="small"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </li>
                );
              })}

              <span>
                <Button
                  $variation="secondary"
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    append({ fullName: "" });
                  }}
                >
                  Add guest full name
                </Button>
              </span>
            </ul>
          </div>

          <FormRow label="Start date" error={errors?.startDate?.message}>
            <Input
              type="date"
              id="startDate"
              disabled={isCreating}
              {...register("startDate", {
                required: "This field is required.",
              })}
            />
          </FormRow>

          <FormRow label="End date" error={errors?.endDate?.message}>
            <Input
              type="date"
              id="endDate"
              disabled={isCreating}
              {...register("endDate", {
                required: "This field is required.",
              })}
            />
          </FormRow>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "26.5rem 1fr 1fr",
              paddingTop: "1.2rem",
              paddingBottom: "1.2rem",
            }}
          >
            <label htmlFor="cabinId">Select cabin</label>
            <Controller
              name="cabinId"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <span style={{ color: "black" }}>
                  <Select
                    options={cabinOptions}
                    onChange={onChange}
                    value={value}
                    inputRef={ref}
                    id="cabinId"
                    error={!!errors.cabinId}
                  />
                </span>
              )}
              rules={{ required: true }}
            />
            {errors.cabinId && (
              <p style={{ color: "red", paddingLeft: "1rem" }}>
                This field is required.
              </p>
            )}
          </div>

          <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
            <Input
              type="number"
              id="extrasPrice"
              disabled={isCreating}
              {...register("extrasPrice")}
            />
          </FormRow>

          <FormRow label="Status" error={errors?.status?.message}>
            <Input
              type="text"
              id="status"
              disabled={isCreating}
              defaultValue="unconfirmed"
              {...register("status")}
            />
          </FormRow>

          <FormRow
            label="Include breakfast?"
            error={errors?.hasBreakfast?.message}
          >
            <StyledCheckbox
              type="checkbox"
              id="hasBreakfast"
              disabled={isCreating}
              {...register("hasBreakfast")}
            />
          </FormRow>

          <FormRow label="Paid?" error={errors?.isPaid?.message}>
            <StyledCheckbox
              type="checkbox"
              id="isPaid"
              disabled={isCreating}
              {...register("isPaid")}
            />
          </FormRow>

          <FormRow label="Observations" error={errors?.observations?.message}>
            <Textarea
              type="text"
              id="observations"
              disabled={isCreating}
              {...register("observations")}
            />
          </FormRow>

          <FormRow>
            <Button
              $variation="secondary"
              type="reset"
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button disabled={isCreating}>
              {/* {isEditSession ? "Edit booking" : "Add booking"} */}
              Add booking
            </Button>
          </FormRow>
        </Form>
      )}{" "}
    </>
  );
};

export default CreateBookingForm;
