<template>
  <div class="overflow-x-auto">
    <div class="min-w-full" :style="`width: ${chartWidth}px`">
      <LineChart
        ref="lineChartRef"
        :chartData="lineChartData"
        :options="lineChartOptions"
        class="bg-our-grey-very-light overflow-auto"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';
import { computed, defineComponent, PropType, ref } from 'vue';
import { ExtractComponentData, LineChart } from 'vue-chart-3';
import { ExamResult } from '../../types/exam';
import { formatDate } from '../../utils/date';

export default defineComponent({
  components: {
    LineChart,
  },
  props: {
    exams: {
      type: Array as PropType<ExamResult[]>,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const exams = props.exams.sort((a, b) => {
      if (a.measureDate > b.measureDate) {
        return 1;
      }

      if (a.measureDate < b.measureDate) {
        return -1;
      }

      return 0;
    });

    Chart.register(...registerables, ChartDataLabels);

    const selectedDataIndex = ref(exams.findIndex(exam => exam.id == props.modelValue));
    const isSelected = (context: Context) => context.dataIndex == selectedDataIndex.value;

    const lineChartRef = ref<ExtractComponentData<typeof LineChart>>();
    const lineChartOptions = ref<ChartOptions<'line'>>({
      responsive: true,
      aspectRatio: 4 / 3,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 5,
          font: {
            weight: 'bold',
          },
          borderWidth: 2,
          borderColor: '#E75252',
          padding: 4,
          backgroundColor: context => {
            return isSelected(context) ? '#E75252' : '#fff';
          },
          color: context => {
            return isSelected(context) ? '#fff' : '#E75252';
          },
          listeners: {
            enter: _context => {
              document.body.style.cursor = 'pointer';
            },
            leave: _context => {
              document.body.style.cursor = 'auto';
            },
            click: (context, _event) => {
              selectedDataIndex.value = context.dataIndex;
              emit('update:modelValue', exams.at(selectedDataIndex.value)!.id);
              context.chart.update();
              document.body.style.cursor = 'pointer';
            },
          },
        },
      },
      layout: {
        padding: {
          top: 50,
          bottom: 10,
          right: 50,
          left: 50,
        },
      },
      scales: {
        xAxis: {
          grid: {
            borderWidth: 2,
            lineWidth: 2,
          },
        },
        yAxis: {
          display: false,
        },
      },
    });
    const data = ref(exams.map(exam => exam.result));
    const lineChartData = computed<ChartData<'line'>>(() => ({
      labels: exams.map(exam => formatDate(exam.measureDate)),
      datasets: [
        {
          data: data.value,
          backgroundColor: '#00000030',
          cubicInterpolationMode: 'monotone',
          borderColor: '#E75252',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#E75252',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 4,
          pointHoverBackgroundColor: '#fff',
          fill: true,
        },
      ],
    }));

    return {
      lineChartRef,
      lineChartOptions,
      lineChartData,
    };
  },
  data() {
    return {
      chart: {
        gap: 35,
        padding: 20,
      },
    };
  },
  computed: {
    chartWidth() {
      return this.lineChartData.datasets[0].data.length * this.chart.gap + this.chart.padding;
    },
  },
});
</script>

<style scoped></style>
