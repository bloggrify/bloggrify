<template>
  <section
    v-if="enabled"
    class="my-12 rounded-xl border border-default bg-elevated/40 p-6"
  >
    <div
      v-if="status === 'success'"
      class="flex items-center gap-3"
    >
      <UIcon
        name="i-lucide-circle-check"
        class="text-primary size-6 shrink-0"
      />
      <div>
        <p class="font-semibold text-default">
          You're subscribed
        </p>
        <p class="text-sm text-muted">
          Thanks for signing up. Check your inbox to confirm.
        </p>
      </div>
    </div>

    <template v-else>
      <h2 class="text-lg font-semibold text-default">
        {{ title }}
      </h2>
      <p class="text-sm text-muted mt-1">
        {{ description }}
      </p>

      <form
        ref="formRef"
        class="mt-4 flex flex-col sm:flex-row gap-2"
        @submit.prevent="onSubmit"
      >
        <UInput
          v-model="email"
          type="email"
          name="email"
          required
          autocomplete="email"
          placeholder="your@email.com"
          size="lg"
          class="flex-1"
        />
        <UButton
          type="submit"
          size="lg"
          label="Subscribe"
          :loading="status === 'loading'"
        />
      </form>

      <p
        v-if="status === 'error'"
        class="text-sm text-error mt-2"
      >
        {{ errorMessage }}
      </p>
    </template>
  </section>
</template>

<script setup lang="ts">
// The subscription logic (provider handling, demo mode) lives in the core
// `subscribe` composable, so themes only ever place this component. Gated by
// `newsletter.enabled` in app.config, it renders nothing when the feature is off.
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Subscribe to the newsletter',
  description: 'Get new posts delivered straight to your inbox. No spam, unsubscribe anytime.',
})

const config = useAppConfig()
const enabled = computed(() => config.newsletter?.enabled === true)

const formRef = ref<HTMLFormElement | null>(null)
const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function onSubmit() {
  status.value = 'loading'
  errorMessage.value = ''

  const result = await subscribe(email.value, formRef.value)

  if (result.success) {
    status.value = 'success'
    email.value = ''
  }
  else {
    status.value = 'error'
    errorMessage.value = result.reason.apiError
      ? 'Something went wrong. Please try again in a moment.'
      : 'Please enter a valid email address.'
  }
}
</script>
