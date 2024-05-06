<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="imageUrl" placeholder="Enter image URL" />
    <button @click="analyzeImage">Analyze Image</button>
    <div v-if="results">
      <h3>Results:</h3>
      <ul>
        <li v-for="result in filteredResults" :key="result.tagName">
          {{ result.tagName }}: {{ (result.probability * 100).toFixed(2) }}%
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      imageUrl: '',
      results: null
    };
  },
  computed: {
    filteredResults() {
      if (!this.results) return [];
      return this.results.predictions.filter(prediction => prediction.probability >= 0.8);
    }
  },
  methods: {
    async analyzeImage() {
      try {
        const response = await axios.post(
                        {
              url: this.imageUrl
            },
            {
              headers: {
                'Prediction-Key': '045051b658ce4ab9b8d2991f03aae6e8',
                'Content-Type': 'application/json'
              }
            }
        );
        this.results = response.data;
      } catch (error) {
        console.error('Error calling the prediction API:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
