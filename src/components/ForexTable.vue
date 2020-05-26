<template>
  <div class="p-fluid">
    <div class="p-field p-col-12 p-md-12" v-if="!loaded">
      <p>Please wait while fetching data ......</p>
      <ProgressSpinner />
    </div>
    <div class="p-fluid p-grid" v-if="loaded">
      <div class="p-field p-col-12 p-md-2">
        <label>Base</label>
        <Dropdown
          v-model="base"
          :options="baseArray"
          placeholder="Select Base"
          :showClear="true"
          @change="filterData"
        ></Dropdown>
      </div>
      <div class="p-field p-col-12 p-md-2">
        <label>Target</label>
        <Dropdown
          v-model="target"
          :options="targetArray"
          :filter="true"
          placeholder="Select Target"
          :showClear="true"
          @change="filterData"
        ></Dropdown>
      </div>
      <div class="p-field p-col-12 p-md-2">
        <label>Amount</label>
        <InputNumber v-model="amount" showButtons :min="0" />
      </div>
      <div class="p-field p-col-12 p-md-12">
        <DataTable :value="filteredData" :paginator="true" :rows="6" selectionMode="single">
          <template #empty>
            <div class="no-record">NO RECORDS FOUND</div>
          </template>
          <Column field="base" header="Base" :sortable="true">
            <template #body="slot">
              <img :src="`https://www.countryflags.io/${slot.data.base.substr(0, 2)}/flat/32.png`" />
              <span style="position: absolute; margin-left: .5em; margin-top:7px">{{slot.data.base}}</span>
            </template>
          </Column>
          <Column field="target" header="Target" :sortable="true">
            <template #body="slot">
              <img
                :src="`https://www.countryflags.io/${slot.data.target.substr(0, 2)}/flat/32.png`"
              />
              <span
                style="position: absolute; margin-left: .5em; margin-top:7px"
              >{{slot.data.target}}</span>
            </template>
          </Column>
          <Column field="timestamp" header="Date and Time"></Column>
          <Column field="rate" header="Exchange Rate">
            <template #body="slot">
              <span>{{ slot.data.rate.rate | currencyDecimal(amount) }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import ForexService from "../services/ForexService";
import { default_data } from "../assets/default_data.json";

export default {
  name: "ForexTable",
  data() {
    return {
      amount: 1,
      loaded: false,
      forexData: null,
      filteredData: null,
      base: null,
      target: null,
      baseArray: null,
      targetArray: null
    };
  },
  forexService: null,

  created() {
    this.forexService = new ForexService();
  },

  mounted() {
    this.loaded = false;
    let data;
    if (navigator.onLine) {
      this.getData();
    } else {
      if (localStorage.getItem("forexData")) {
        data = JSON.parse(localStorage.getItem("forexData"));
      } else {
        data = default_data;
      }
      this.filteredData = this.forexData = data;
      this.initArray();
      alert(
        "You are either offline or connection to API is limited. We will display the offline data instead."
      );
      this.loaded = true;
    }
  },

  methods: {
    getData() {
      this.forexService
        .getForexData()
        .then(response => {
          this.filteredData = this.forexData = this.createObject(
            response.data.rates
          );
          localStorage.setItem("forexData", JSON.stringify(this.forexData));
          this.loaded = true;
          this.initArray();
        })
        .catch(error => console.log(error));
    },
    createObject(rates) {
      let array = [];
      Object.entries(rates).forEach(datum => {
        let obj = {};
        obj.base = datum[0].substr(0, 3);
        obj.target = datum[0].substr(3, 3);
        obj.timestamp = new Date(datum[1].timestamp * 1000).toLocaleString();
        obj.rate = datum[1];
        array.push(obj);
      });
      return array;
    },
    initArray() {
      let targetUnique = new Set();
      let baseUnique = new Set();
      this.forexData.forEach(datum => {
        targetUnique.add(datum.target);
        baseUnique.add(datum.base);
      });
      this.targetArray = [...targetUnique];
      this.baseArray = [...baseUnique];
    },
    filterData() {
      if (this.base !== null && this.target !== null) {
        this.filteredData = this.forexData.filter(datum => {
          return (
            datum.base.includes(this.base) && datum.target.includes(this.target)
          );
        });
      } else if (this.base) {
        this.filteredData = this.forexData.filter(datum =>
          datum.base.includes(this.base)
        );
      } else if (this.target) {
        this.filteredData = this.forexData.filter(datum =>
          datum.target.includes(this.target)
        );
      } else {
        this.filteredData = this.forexData;
      }
    }
  },
  filters: {
    currencyDecimal(rate, amount) {
      return Number(rate * amount).toFixed(3);
    }
  }
};
</script>

<style scoped>
.p-field.p-col-12.p-md-2 {
  position: relative;
  left: 25%;
}

.no-record {
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
}
</style>