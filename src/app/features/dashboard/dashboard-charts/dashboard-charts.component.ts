import {
  Component,
  Inject,
  PLATFORM_ID,
  type OnInit,
  type OnDestroy,
  ViewChild,
  type ElementRef,
  type AfterViewInit
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { Chart, type ChartType, registerables } from "chart.js";

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: "app-dashboard-charts",
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: "./dashboard-charts.component.html",
  styleUrls: ["./dashboard-charts.component.scss"],
})
export class DashboardChartsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("usersChart", { static: false })
  usersChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild("growthChart", { static: false })
  growthChartRef!: ElementRef<HTMLCanvasElement>;

  private usersChart: Chart | null = null;
  private growthChart: Chart | null = null;

  // Datos simplificados
  usersData = {
    total: 10000,
    active: 7500,
    growth: 12.5,
    monthlyGrowth: 8.5,
  };

  monthlyGrowthData = [8.2, 9.1, 10.5, 11.2, 11.8, 12.5];

  get averageGrowth(): number {
    return Number(
      (
        this.monthlyGrowthData.reduce((a, b) => a + b, 0) /
        this.monthlyGrowthData.length
      ).toFixed(1)
    );
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Inicialización básica
  }

  ngAfterViewInit(): void {
    // Sólo inicializamos los charts en el navegador
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    setTimeout(() => {
      this.initUsersChart();
      this.initGrowthChart();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.usersChart) {
      this.usersChart.destroy();
    }
    if (this.growthChart) {
      this.growthChart.destroy();
    }
  }

  private initUsersChart(): void {
    if (!this.usersChartRef?.nativeElement) return;

    const ctx = this.usersChartRef.nativeElement.getContext("2d");
    if (!ctx) return;

    this.usersChart = new Chart(ctx, {
      type: "line" as ChartType,
      data: {
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Total Users",
            data: [8200, 8500, 8800, 9200, 9600, 10000],
            borderColor: "#2B2F76",
            backgroundColor: "#2B2F7620",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#2B2F76",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
          },
          {
            label: "Active Users",
            data: [6150, 6375, 6600, 6900, 7200, 7500],
            borderColor: "#10B981",
            backgroundColor: "#10B98120",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: { size: 12, weight: 500 },
              color: "#374151",
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6B7280" },
          },
          y: {
            beginAtZero: false,
            grid: { color: "#F3F4F6" },
            ticks: {
              color: "#6B7280",
              callback: (value) => (value as number).toLocaleString(),
            },
          },
        },
      },
    });
  }

  private initGrowthChart(): void {
    if (!this.growthChartRef?.nativeElement) return;

    const ctx = this.growthChartRef.nativeElement.getContext("2d");
    if (!ctx) return;

    this.growthChart = new Chart(ctx, {
      type: "bar" as ChartType,
      data: {
        labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Growth Rate (%)",
            data: this.monthlyGrowthData,
            backgroundColor: [
              "#2B2F7680",
              "#2B2F7690",
              "#292D7480",
              "#292D7490",
              "#2B2F76A0",
              "#2B2F76",
            ],
            borderColor: "#2B2F76",
            borderWidth: 2,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6B7280" },
          },
          y: {
            beginAtZero: true,
            grid: { color: "#F3F4F6" },
            ticks: {
              color: "#6B7280",
              callback: (value) => `${value}%`,
            },
          },
        },
      },
    });
  }

  changeUsersPeriod(period: string): void {
    console.log("Changing users period to:", period);
  }

  changeGrowthPeriod(period: string): void {
    console.log("Changing growth period to:", period);
  }
}
