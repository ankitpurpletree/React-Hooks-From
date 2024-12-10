import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
};

const YouTube = () => {
  const form = useForm<FormValues>({
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: data.username,
    //     email: data.email,
    //     channel: data.channel,
    //   };
    defaultValues: {
      username: "batman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const renderCount = useRef(0);
  renderCount.current++;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <h1>YouTube Form ({Math.floor(renderCount.current / 2)})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username Field */}
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters",
              },
            })}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
              validate: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Email address is not allowed"
                );
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Channel Field */}
        <div>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register("channel", {
              required: "Channel name is required",
              pattern: {
                value: /^[a-zA-Z0-9_]*$/,
                message:
                  "Channel name can only contain alphanumeric characters and underscores",
              },
            })}
          />
          {errors.channel && (
            <p style={{ color: "red" }}>{errors.channel.message}</p>
          )}
        </div>

        <div>
          <label htmlFor='twitter'>twitter</label>
          <input type='text' id='twitter' {...register("social.twitter")} />
        </div>

        <div>
          <label htmlFor='facebook'>facebook</label>
          <input type='text' id='facebook' {...register("social.facebook")} />
        </div>

        {/* Submit Button */}
        <button type='submit'>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTube;
