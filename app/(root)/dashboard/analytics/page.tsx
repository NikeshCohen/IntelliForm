"use client";

import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import StackedbarChart from "./_components/StackedbarChart";
import DotChart from "./_components/DotCart";
import GroupedbarChart from "./_components/GroupedbarChart";
import LineChart from "./_components/LineChart";
import LabelledpieChart from "./_components/LabelledpieChart";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [copied, setCopied] = useState(false);
  return (
    <>
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
      <div className="md:hidden h-[80vh] w-full flex flex-col justify-center items-center">
        <h1 className="text-2xl text-center">
          Analytics are only viewable on desktop.
        </h1>
        <p className="text-center pt-2">
          To view analytics, copy the link and open it on a desktop browser.
        </p>
        <Button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
          }}
        >
          {copied ? "Link Copied!" : "Copy Link"}
        </Button>
      </div>
    </>
  );
}
