import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { askAi } from '../api/client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { aiPromptSchema, type AiPromptFormValues } from '@/schemas/aiPromptSchema'

export function AiAssistantPage() {
  const aiMutation = useMutation({ mutationFn: askAi })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AiPromptFormValues>({
    resolver: zodResolver(aiPromptSchema),
    defaultValues: { prompt: '' },
  })

  const onSubmit = (values: AiPromptFormValues) => {
    aiMutation.mutate(values.prompt)
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100">AI Meal Assistant</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Share your schedule, preferences, or dietary needs for campus meal ideas.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="prompt">What kind of meal are you looking for?</Label>
            <textarea
              id="prompt"
              rows={5}
              aria-invalid={Boolean(errors.prompt)}
              aria-describedby={errors.prompt ? 'prompt-error' : 'prompt-help'}
              placeholder="For example: I have a short lunch break and would like a filling vegetarian meal."
              {...register('prompt')}
              className="mt-1 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:ring-orange-500/30"
            />
            {errors.prompt ? (
              <p id="prompt-error" className="text-sm text-red-600 dark:text-red-400">
                {errors.prompt.message}
              </p>
            ) : (
              <p id="prompt-help" className="text-sm text-slate-500 dark:text-slate-400">
                Use 20-2000 characters. AI ideas are suggestions, not a live menu listing.
              </p>
            )}
          </div>

          {aiMutation.isError && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {aiMutation.error instanceof Error
                ? aiMutation.error.message
                : 'Unable to get meal suggestions.'}
            </p>
          )}

          <Button type="submit" disabled={aiMutation.isPending}>
            {aiMutation.isPending ? 'Thinking...' : 'Get meal ideas'}
          </Button>
        </form>

        {aiMutation.data && (
          <section
            aria-live="polite"
            className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your meal plan</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">{aiMutation.data.summary}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Recommendations</h3>
              {aiMutation.data.recommendations.map((recommendation, index) => (
                <article
                  key={`${recommendation.name}-${index}`}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">
                      {recommendation.name}
                    </h4>
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold capitalize text-orange-800 dark:bg-orange-500/10 dark:text-orange-200">
                      {recommendation.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {recommendation.description}
                  </p>
                </article>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Helpful tips</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600 dark:text-slate-300">
                {aiMutation.data.tips.map((tip, index) => (
                  <li key={`${tip}-${index}`}>{tip}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
