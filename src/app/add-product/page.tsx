import React, { FormEvent } from "react";
import prisma from "@/lib/db/prisma";
import { redirect, useRouter } from "next/navigation";

import FormSubmitButton from "@/components/form_submit_button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - CLFeshes",
};

const addProduct = async (formData: FormData) => {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString() || ""; // Provide a default value
  const price = Number(formData.get("price") || 0);

  if (!name || !description || imageUrl || !price) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
};

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct}>
        {/* Add your form input fields here */}
        <input
          name="name"
          className="mb-3 w-full input-bordered"
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          className="textarea-bordered textarea mb-3 w-full"
          placeholder="Description"
          required
        />
        <input
          name="imageUrl"
          type="url"
          className="input-bordered input mb-3 w-full"
          placeholder="Image URL"
          required
        />
        <input
          name="price"
          type="number"
          className="input-bordered input mb-3 w-full"
          placeholder="Price"
          required
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
