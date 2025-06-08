'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TFormRegisterValues, formRegisterSchema } from '../forms/schemas';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { updateUserInfo } from '@/app/actions';
import { Button } from '@/components/ui';
import { FormInput } from '../form-components/form-input';
import { Container, Title } from '..';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('User info succefully updated!');
    } catch (error) {
      return toast.error('Error updating user info');
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10">
        <Title text={`Personal info | #${data.id}`} size="md" className="font-bold" />

        <FormProvider {...form}>
            <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="email" label="E-Mail" required />
            <FormInput name="fullName" label="Full name" required />

            <FormInput type="password" name="password" label="New password" />
            <FormInput type="password" name="confirmPassword" label="Repeat new password" />

            <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                Save
            </Button>

            <Button
                onClick={onClickSignOut}
                variant="outline"
                disabled={form.formState.isSubmitting}
                className="text-base"
                type="button">
                Sign out
            </Button>
            </form>
        </FormProvider>
    </Container>
  );
};