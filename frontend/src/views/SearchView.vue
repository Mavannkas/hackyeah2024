<template>
  <div class="flex h-full flex-col p-6">
    <h1 class="mb-4 text-3xl font-bold">Wyszukaj trasę</h1>
    <form class="flex flex-1 flex-col gap-6">
      <div class="flex flex-col gap-y-2">
        <BaseSearchInput
          type="text"
          label="Skąd jedziemy?"
          id="startingPoint"
          placeholder="Kraków Główny"
          query="startingPoint"
          v-model="startingPoint"
          geo-input
          @geolocation="(value) => (isGeolocated = value)"
        />
        <BaseSearchInput
          v-for="(_, index) in additionalWaypoints"
          :key="index"
          type="text"
          label="Punkt pośredni"
          deletable
          @close="additionalWaypoints.splice(index, 1)"
          :id="`waypoint-${index}`"
          v-model="additionalWaypoints[index]"
        />
        <div class="flex justify-between">
          <button type="button" @click.prevent="addNewWaypoint">
            <svg
              width="24"
              height="50"
              viewBox="0 0 24 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="25" r="12" fill="#D9D9D9" />
              <path d="M12 50L12 30" stroke="#D9D9D9" stroke-width="4" stroke-dasharray="4 4" />
              <path
                d="M12 20L12 8.9407e-07"
                stroke="#D9D9D9"
                stroke-width="4"
                stroke-dasharray="4 4"
              />
              <path
                d="M12 20V30"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 25H17"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button type="button" class="mr-1" @click.prevent="switchInputs">
            <svg
              class="h-6 w-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 20V10m0 10-3-3m3 3 3-3m5-13v10m0-10 3 3m-3-3-3 3"
              />
            </svg>
          </button>
        </div>
        <BaseSearchInput
          type="text"
          label="Dokąd jedziemy?"
          id="destination"
          query="destination"
          placeholder="TAURON Arena Kraków"
          v-model="destination"
        />
      </div>
      <div class="flex gap-4">
        <BaseDropdown
          class="w-1/2"
          placeholder="Typ roweru"
          :options="bikeOptions"
          @update:model-value="(value: string) => (bikeOption = value)"
        />
        <BaseDropdown
          class="w-1/2"
          placeholder="Styl jazdy"
          :options="rideOptions"
          @update:model-value="(value: string) => (rideOption = value)"
        />
      </div>
      <BaseCheckbox id="withChildren" v-model="withChildren">Jadę z dzieckiem</BaseCheckbox>
      <BaseCheckbox id="nationalRoads" v-model="avoidNationalRoads"
        >Omiń drogi krajowe</BaseCheckbox
      >
      <BaseButton class="mt-auto" type="submit" @click.prevent="handleSearchForm"
        >Znajdź najlepszą trasę
      </BaseButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseSearchInput from '@/components/BaseSearchInput.vue'
import { getCurrentGeolocation } from '@/helpers/getCurrentGeolocation'
import { getPointData } from '@/helpers/getPointData'
import { onMounted, ref } from 'vue'
import { useLocationStore } from '@/stores/location'
import { useRouter } from 'vue-router'
import { ROUTING_URLS } from '@/router'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'

const isGeolocated = ref(false)

const startingPoint = ref('')
const destination = ref('')
const bikeOption = ref('')
const rideOption = ref('')
const additionalWaypoints = ref<string[]>([])
const withChildren = ref(false)
const avoidNationalRoads = ref(false)
const locationStore = useLocationStore()
const router = useRouter()

onMounted(() => {
  const data = locationStore.getSearchData()
  startingPoint.value = data.startingPointName
  destination.value = data.destinationPointName
})

const bikeOptions = [
  {
    label: 'Rower miejski',
    value: 'cityBike'
  },
  {
    label: 'Rower górski',
    value: 'mountainBike'
  },
  {
    label: 'Rower szosowy',
    value: 'roadBike'
  }
]
const rideOptions = [
  {
    label: 'Jazda rekreacyjna',
    value: 'recreationalRide'
  },
  {
    label: 'Jazda treningowa',
    value: 'trainingRide'
  },
  {
    label: 'Jazda miejska',
    value: 'cityRide'
  }
]

const addNewWaypoint = () => {
  additionalWaypoints.value = [...additionalWaypoints.value, '']
}

const switchInputs = () => {
  const destVal = destination.value
  const startVal = startingPoint.value
  startingPoint.value = destVal
  destination.value = startVal
}

const getMappedValue = () => {
  if (
    bikeOption.value === 'cityBike' &&
    (rideOption.value === 'recreationalRide' || rideOption.value === 'cityRide') &&
    withChildren.value
  ) {
    return 'family'
  }
  if (
    (bikeOption.value === 'mountainBike' || bikeOption.value === 'roadBike') &&
    rideOption.value === 'trainingRide' &&
    !withChildren.value && // Bez dzieci
    !avoidNationalRoads.value
  ) {
    return 'sport'
  }
  return 'default'
}
const filterValue = ref('default')

const handleSearchForm = async () => {
  filterValue.value = getMappedValue()
  try {
    let startingPointData: { x: number; y: number } | undefined

    if (isGeolocated.value) {
      startingPointData = await getCurrentGeolocation()
    } else {
      const response = await getPointData(startingPoint.value)
      startingPointData = { x: response[0].x, y: response[0].y }
    }

    const destinationResponse = await getPointData(destination.value)

    const additionalWaypointsData = []

    for (const waypoint of additionalWaypoints.value) {
      const res = await getPointData(waypoint)
      additionalWaypointsData.push({ x: res[0].x, y: res[0].y })
    }

    const destinationData = { x: destinationResponse[0].x, y: destinationResponse[0].y }
    if (!startingPointData || !destinationData) {
      throw new Error('No data')
    }
    locationStore.update(
      startingPointData,
      destinationData,
      additionalWaypointsData,
      filterValue.value,
      startingPoint.value,
      destination.value
    )
    void router.push(ROUTING_URLS.MAP)
  } catch (error) {
    console.error(error)
  }
}
</script>
