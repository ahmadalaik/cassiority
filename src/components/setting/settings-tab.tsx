import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { settingUserSchema, type SettingUser, type UserType } from "@/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Shield, User } from "lucide-react";
import AvatarCropper from "./avatar-cropper";

export default function SettingsTab({ user }: { user: UserType }) {
  const form = useForm<SettingUser>({
    resolver: zodResolver(settingUserSchema),
    values: {
      ...user,
    },
  });

  const onSubmit = async (data: SettingUser) => {
    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.pasword) {
      formData.append("password", data.pasword);
    }

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    console.log("submit", data);
    // send to api
    // todo
  };

  const tabs = [
    { title: "Profile", icon: User, value: "profile" },
    { title: "Account", icon: Shield, value: "account" },
  ];

  return (
    <Tabs
      defaultValue={tabs[0].value}
      orientation="vertical"
      className="flex flex-col lg:flex-row gap-4 w-full max-w-4xl mx-auto"
    >
      <TabsList className="flex flex-row! lg:flex-col! max-w-xl w-60 p-2">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.title} value={tab.value} className="py-2 px-3 gap-2">
            {tab.icon && <tab.icon />} {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="profile" forceMount className="data-[state=inactive]:hidden">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information and settings.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <form id="setting-profile-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Avatar */}
                <Controller
                  name="avatar"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-40 h-full">
                      {/* <CampaignImageUpload field={field} setCampaignImg={setCampaignImg} /> */}
                      <AvatarCropper field={field} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-profile-name">Name</FieldLabel>
                      <Input
                        {...field}
                        id="form-profile-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your name"
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-profile-email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="form-profile-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your email"
                        autoComplete="off"
                        disabled
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="setting-profile-form">
              Update Profile
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <form id="setting-account-form">
              <FieldGroup>
                <Controller
                  name="pasword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-account-password">Password</FieldLabel>
                      <Input
                        {...field}
                        id="form-account-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your password"
                        autoComplete="off"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="setting-account-form">
              Update Account
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
