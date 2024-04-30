import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import React, { useContext } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CycleContext } from '../../Contexts/CyclesContexts'

// Esquema de Validação de dados colocados ao campo
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no minimo 5 minutos')
    .max(60, 'O ciclo precisa serno maximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, InterruptCurrentCycle } =
    useContext(CycleContext)

  // Codigo que faz a verificação de dados e validação da tipagem a partir do esquema ao seremcolocados nos campos
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycles(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const realtimeTask = watch('task')
  const submitDisabled = !realtimeTask

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycles)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={submitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
