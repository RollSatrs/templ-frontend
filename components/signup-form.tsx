"use client"

import { cn } from "@/lib/utils"
import { Button,  } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { sizes } from "@/const/css"
import { apiPost } from "@/lib/api"
import { useState } from "react"
import { ButtonGroup } from "./ui/button-group"

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("student") 

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handlerSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      setLoading(false)
      return
    }

    try {
      const response = await apiPost("/auth/register", { fullname, email, password, role })
      alert("Регистрация успешна!")
      setFullName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setRole("student")
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || "Ошибка регистрации")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handlerSignup} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Создать аккаунт</h1>
          <p className={sizes.small}>
            Заполните форму ниже, чтобы создать аккаунт
          </p>
        </div>
        <div className="flex justify-center">
          <ButtonGroup >
            <Button 
              onClick={() =>setRole("student")} 
              variant={role === "student" ? "default" : "outline"}
              type="button"
            >
                Студент
            </Button>
            <Button
              onClick={() =>setRole("schoolchildren")} 
              variant={role === "schoolchildren" ? "default" : "outline"}
              type="button" 
            >
              Школьник
            </Button>
          </ButtonGroup>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Полное имя</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Роллан"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FieldDescription className={sizes.mini}>
            Мы будем использовать этот email для связи с вами. Ваш email никто не увидит.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FieldDescription className={sizes.mini}>
            Пароль должен быть не менее 8 символов.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Подтверждение пароля</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FieldDescription className={sizes.mini}>
            Пожалуйста, подтвердите ваш пароль.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="role">Роль</FieldLabel>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="teacher">Учитель</option>
            <option value="student">Студент</option>
            <option value="schoolkid">Школьник</option>
          </select>
          <FieldDescription className={sizes.mini}>
            Выберите вашу роль.
          </FieldDescription>
        </Field>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Регистрация..." : "Создать аккаунт"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Уже есть аккаунт? <a href="login">Войти</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
