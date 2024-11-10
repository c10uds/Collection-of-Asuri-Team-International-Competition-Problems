<template>
  <div id="home">
    <h1>Collection of Asuri Team International Competition Problems</h1>
    <a-tabs :default-active-key="-1" @tabClick="changeCompetition">
      <a-tab-pane :key="-1" title="Hello">
        <div>
          <h2>Introduction</h2>
          <h3>
            This is a website to collect some of the problems in competitions
            that Asuri Team have participate in.
          </h3>
        </div>
      </a-tab-pane>
      <a-tab-pane
        :key="key"
        :title="item"
        v-for="(item, key) in competitionArray"
      >
        <a-tabs
          :default-active-key="-1"
          position="left"
          style="margin-top: 2rem"
          lazy-load
        >
          <a-tab-pane :key="-1" title="Description">
            <a-descriptions>
              <a-descriptions-item label="比赛名称">
                {{ item }}
              </a-descriptions-item>
              <a-descriptions-item label="开始时间">
                {{ competitionMap?.get(item).startTime }}
              </a-descriptions-item>
              <a-descriptions-item label="结束时间">
                {{ competitionMap?.get(item).endTime }}
              </a-descriptions-item>
              <a-descriptions-item label="描述">
                {{ competitionMap?.get(item).des }}
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane :key="k" :title="type" v-for="(type, k) in typeArray">
            <div style="display: flex">
              <a-card
                class="question-card"
                :title="question.challName"
                hoverable
                v-for="(question, idx) in challMap.get(item).get(type)"
                :key="idx"
              >
                <template #extra>
                  <a-link
                    :href="question.fileName"
                    v-if="question.fileName.startsWith(`http`)"
                    >链接
                  </a-link>
                  <a-link
                    :href="getFilePath(item, type, question.fileName)"
                    v-else
                    >{{ question.fileName }}
                  </a-link>
                </template>
                <div style="font-size: 1rem; text-align: left; padding: 10px">
                  {{
                    question.description === ""
                      ? "无描述"
                      : question.description
                  }}
                </div>
              </a-card>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const challMap = ref();
const competitionArray = ref([""]);
const competitionMap = ref();
const loadData = () => {
  // 初始化
  let files = [];
  let challInfo = [];
  let competitions = new Map();
  files = require.context("/public/json/competition", false, /\.json$/).keys();
  console.log(files);
  for (const path of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    competitions.set(
      path.slice(2).split(".")[0],
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("/public/json/competition" + path.slice(1))
    );
  }
  competitionMap.value = competitions;
  console.log(competitions);
  //https://raw.githubusercontent.com/c10uds/Collection-of-Asuri-Team-International-Competition-Problems/main/README.md
  files = require.context("/public/json/challenge", false, /\.json$/).keys();
  for (const path of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    challInfo.push(require("/public/json/challenge" + path.slice(1)));
  }
  let competitionsToChalls = new Map();
  for (const info of challInfo) {
    if (competitionsToChalls.has(info["competition"])) {
      let types = competitionsToChalls.get(info["competition"]);
      if (types.has(info["type"])) {
        types.get(info["type"]).push(info);
      } else {
        types.set(info["type"], [info]);
      }
    } else {
      let tmp = new Map();
      tmp.set(info["type"], [info]);
      competitionsToChalls.set(info["competition"], tmp);
    }
  }
  challMap.value = competitionsToChalls;
  competitionArray.value = Array.from(challMap.value.keys());
};
onMounted(() => {
  loadData();
});
const typeArray = ref([""]);
const changeCompetition = (key: number) => {
  if (key !== -1) {
    typeArray.value = Array.from(
      challMap.value.get(competitionArray.value[key]).keys()
    );
  }
};

const getFilePath = (competition: string, type: string, fileName: string) => {
  return `./attachment/${competition}/${type}/${fileName}`;
};

//整理文件结构
</script>
<style scoped>
#home {
  padding: 40px;
  text-align: center;
}

.question-card {
  width: 400px;
  min-height: 300px;
  margin-left: 5rem;
  margin-top: 32px;
  transition-property: all;
  border-radius: 16px;
}

.question-card:hover {
  transform: translateY(-4px);
}
</style>
