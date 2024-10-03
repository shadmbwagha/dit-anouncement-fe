<template>
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full align-middle">
          <div class="relative mb-4 text-gray-500 focus-within:text-gray-900">
            <input
              type="text"
              v-model="searchTerm"
              class="block w-80 h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              placeholder="Search for information"
            />
          </div>
          <div class="overflow-hidden">
            <table class="min-w-full rounded-xl">
              <thead>
                <tr class="bg-gray-50">
                  <th class="p-5 text-sm font-semibold leading-6 text-left text-gray-900 capitalize rounded-t-xl">
                    Information Title
                  </th>
                  <th class="p-5 text-sm font-semibold leading-6 text-left text-gray-900 capitalize">
                    Content
                  </th>
                  <th class="p-5 text-sm font-semibold leading-6 text-left text-gray-900 capitalize">
                    Category
                  </th>
                  <th class="p-5 text-sm font-semibold leading-6 text-left text-gray-900 capitalize">
                    Expiration Date
                  </th>
                  <th class="p-5 text-sm font-semibold leading-6 text-left text-gray-900 capitalize">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <tr v-for="item in filteredInformation" :key="item.id" class="bg-white hover:bg-gray-50">
                  <td class="p-5 text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">{{ item.title }}</td>
                  <td class="p-5 text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">{{ item.content }}</td>
                  <td class="p-5 text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">{{ item.category.name }}</td>
                  <td class="p-5 text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                    {{ formatDate(item.expiration_date) }}
                  </td>
                  <td class="p-5">
                    <button class="text-indigo-600 hover:text-indigo-900">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        information: [],
        searchTerm: '',
      };
    },
    computed: {
      // Filter the information based on the search term
      filteredInformation() {
        return this.information.filter((item) =>
          item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
    methods: {
      // Fetch information from the API
      async fetchInformation() {
        try {
          const response = await axios.get('information');
          this.information = response.data; // Assuming the API response is structured accordingly
        } catch (error) {
          console.error('Error fetching information:', error);
        }
      },
      // Format the date to a more readable format
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
    },
    mounted() {
      // Fetch the information when the component is mounted
      this.fetchInformation();
    },
  };
  </script>
  