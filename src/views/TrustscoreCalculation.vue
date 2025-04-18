<template>
  <va-card>
    <va-card-title>Trustscore calculation</va-card-title>
    <va-card-content>
      <p> The trustscore is calculated as follows: </p>
      <ul class="va-unordered">
        <li>
          First for certain facts that grow quickly, such as the amount of stars of a project, we apply the logarithm
          function. This is done because otherwise these attributes could take over the entire trustscore very quickly.
        </li>
        <li>
          Then we multiply this value by a "weight" value that was defined for each trustfact, these weights were based
          on a study where developers where surveyed on how important they thought certain information was when
          selecting software packages.
        </li>
        <li>
          Then we divide every trustfact by the average value for that fact, these averages were obtained by running the
          spider on PyPi packages. For the facts were a logarithm is applied the average also first has a logarithm
          applied.
        </li>
      </ul>
      <p>
        Then the values are combined:
      </p>
      <ul class="va-unordered">
        <li>
          All these values are summed together, if there are multiple occurrences for the same fact type, the average
          value of these occurrences is taken.
        </li>
        <li>
          After the values are summed together there are put into a logistic function to squash the values between 0 and
          100, the parameters of the logistic function were chosen so that an average package would fall around a
          trustscore of 60.
        </li>
      </ul>
      <p>
        Or expressed as a formula:
      </p>
      <div class="center">
        <img src="/equation-1.svg"></img>
      </div>
      <div class="center">
        <img src="/equation-2.svg"></img>
      </div>
      <br/>
      <p>
        The category score calculation is done in an identical way,
        just with adjusted growth rate and midpoint for the logistic function.
      </p>
      <br/>
      <p>
        These are the averages, weights and log for each of the fact types:
      </p>
      <br/>
      <div class="va-table-responsive center">
        <table class="va-table">
          <thead>
            <tr>
              <th>Fact name</th>
              <th>Fact average</th>
              <th>Fact weight</th>
              <th>Logaritmic?</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fact in facts" :key="fact.fact">
              <td>{{ fact.fact }}</td>
              <td>{{ fact.average }}</td>
              <td>{{ fact.weight }}</td>
              <td>{{ fact.log ? "Yes" : "No" }}</td>
              <td>{{ fact.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let facts = ref([
  { fact: "Number of downloads", weight: 63, average: 2E4, log: true, category: "Community and Popularity" },
  { fact: "Star count of owner", weight: 24.21, average: 5000, log: true, category: "Community and Popularity" },
  { fact: "Cve count", weight: -16.47, average: 2, log: false, category: "Security" },
  { fact: "Virus ratio", weight: -16.47, average: 0.1, log: false, category: "Security" },
  { fact: "Dependecy count", weight: 8.04, average: 20, log: false, category: "Dependencies and Ecosystem" },
  { fact: "GitHub contributor count", weight: 4.41, average: 100, log: true, category: "Community and Popularity" },
  { fact: "Average time per release", weight: -2.32, average: 1E7, log: false, category: "Project Health and Maintenance" },
  { fact: "Used count", weight: 60, average: 1E5, log: true, category: "Dependencies and Ecosystem" },
  { fact: "Release download count", weight: 1, average: 300, log: true, category: "Community and Popularity" },
  { fact: "Yearly commit count", weight: 15, average: 50, log: true, category: "Project Health and Maintenance" },
  { fact: "Average issue resolution time", weight: -4, average: 4E4, log: false, category: "Project Health and Maintenance" },
  { fact: "GitHub star ranking", weight: 1, average: 600, log: false, category: "Community and Popularity" },
  { fact: "Issue count for specific release", weight: 1, average: 20, log: false, category: "Project Health and Maintenance" },
  { fact: "Open issues", weight: 2, average: 50, log: false, category: "Project Health and Maintenance" },
  { fact: "Issues without responses", weight: -7, average: 70, log: false, category: "Project Health and Maintenance" },
  { fact: "Open/Closed issue ratio", weight: -15, average: 0.29, log: false, category: "Project Health and Maintenance" },
  { fact: "libraries.io Contributor count", weight: 6, average: 100, log: true, category: "Community and Popularity" },
  { fact: "Dependant packages count", weight: -1, average: 5000, log: false, category: "Dependencies and Ecosystem" },
  { fact: "Number of releases", weight: 2, average: 70, log: true, category: "Project Health and Maintenance" },
  { fact: "Sourcerank metric", weight: 8, average: 20, log: false, category: "Project Health and Maintenance" },
  { fact: "StackOverflow popularity", weight: 18, average: 0.05, log: true, category: "Community and Popularity" },
]);
</script>

<style scoped>
p,
li {
  font-size: 1.1em;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  margin-top: 2em;
}
</style>
