"use client";

// export const metadata = {
//   title: "IntelliForm / Dashboard / Analytics",
// };

import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { JSX, ClassAttributes, HTMLAttributes } from "react";

export default function Component() {
  return (
    <div className="md:grid gap-6 p-4 md:p-6 w-full hidden">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Total Forms</CardDescription>
            <CardTitle>23</CardTitle>
          </CardHeader>
          <CardContent>
            <StackedbarChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Submissions</CardDescription>
            <CardTitle>345</CardTitle>
          </CardHeader>
          <CardContent>
            <DotChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle>33.5%</CardTitle>
          </CardHeader>
          <CardContent>
            <GroupedbarChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Visitors</CardDescription>
            <CardTitle>3,456</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardDescription>Form Views</CardDescription>
            <CardTitle>12,345</CardTitle>
          </CardHeader>
          <CardContent>
            <LabelledpieChart className="aspect-[4/3]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Top Referrers</CardDescription>
            <CardTitle>Visitor Sources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <div>google.com</div>
              <div className="font-semibold ml-auto">3K</div>
            </div>
            <div className="flex items-center">
              <div>twitter.com</div>
              <div className="font-semibold ml-auto">1.2K</div>
            </div>
            <div className="flex items-center">
              <div>youtube.com</div>
              <div className="font-semibold ml-auto">1.1K</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DotChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveScatterPlot
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function GroupedbarChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", desktop: 111, mobile: 99 },
          { name: "Feb", desktop: 157, mobile: 87 },
          { name: "Mar", desktop: 129, mobile: 89 },
          { name: "Apr", desktop: 187, mobile: 151 },
          { name: "May", desktop: 119, mobile: 127 },
          { name: "Jun", desktop: 20, mobile: 121 },
        ]}
        keys={["desktop", "mobile"]}
        indexBy="name"
        groupMode="grouped"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb", "#e11d48"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A grouped bar chart"
      />
    </div>
  );
}

function LabelledpieChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        arcLinkLabelsThickness={1}
        enableArcLabels={false}
        colors={["#2563eb"]}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function LineChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

function StackedbarChart(
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLDivElement> &
    HTMLAttributes<HTMLDivElement>
) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", desktop: 111, mobile: 99 },
          { name: "Feb", desktop: 157, mobile: 87 },
          { name: "Mar", desktop: 129, mobile: 89 },
          { name: "Apr", desktop: 187, mobile: 151 },
          { name: "May", desktop: 119, mobile: 127 },
          { name: "Jun", desktop: 20, mobile: 121 },
        ]}
        keys={["desktop", "mobile"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb", "#e11d48"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A stacked bar chart"
      />
    </div>
  );
}
