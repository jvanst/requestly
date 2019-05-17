<template>
  <v-container class="mb-5">
    <div id="skew-background-1" />
    <div id="skew-background-2" />

    <section>
      <v-layout
        class="white--text"
        style="height:600px"
        wrap
      >
        <v-flex sm6 xs12>
          <v-layout
            column
            justify-center
            fill-height
            >
            <v-flex
              shrink
              class="pa-2"
              :class="{
                'display-2 pa-2' : $vuetify.breakpoint.mdAndUp,
                'display-1 text-xs-center' : $vuetify.breakpoint.smAndDown
              }"
            >
              <p>Take back control of</p>
              <v-carousel
                hide-delimiters
                :show-arrows="false"
                cycle
                touchless
                vertical
                :interval="2000"
                height="85"
                width="100"
                reverse
              >
                <v-carousel-item>
                  Feature Requests
                </v-carousel-item>
                <v-carousel-item>
                  Bug Reports
                </v-carousel-item>
                <v-carousel-item>
                  Stakeholder demands
                </v-carousel-item>
                <v-carousel-item>
                  Software Projects
                </v-carousel-item>
                <v-carousel-item>
                  Business Inquiries
                </v-carousel-item>
              </v-carousel>
              <v-btn
                depressed
                large
                to="/login"
                class="mt-5"
                >
                Get Started
              </v-btn>
            </v-flex>
            <v-flex shrink class="pl-3">

            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm6 xs12 align-self-center>
          <v-img
            :src="require('@/assets/creation_process.svg')"
            width="100%"
          />
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-sheet
        elevation="2"
        :class="{
          'pa-3' : $vuetify.breakpoint.smAndDown,
          'pa-5' : $vuetify.breakpoint.mdAndUp
        }"
      >
        <v-layout
          row
          wrap
          align-center
          justify-center
          fill-height
        >
          <v-flex xs12 md4>
            <v-card flat>
              <v-card-title class="title">
                Detailed requests, refined to your standards
              </v-card-title>
              <v-card-text>
                Requestly provides unique form building controls which help streamline requests
                from stakeholders.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card flat>
              <v-card-title class="title">
                Streamlined communication
                and notifications
              </v-card-title>
              <v-card-text>
                Keep all parties informed about the status of requests.
                A breakdown in communication leads to frustration and reduced trust.
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card flat>
              <v-card-title class="title">
                Open source, Free to use
              </v-card-title>
              <v-card-text>
                Requestly will always be free to use, with its open source core available on github.
                If you want full control of your data, you can host requestly privately.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-sheet>
    </section>

    <section>
      <v-sheet
        elevation="2"
        class="mt-4"
        :class="{
          'pa-3' : $vuetify.breakpoint.smAndDown,
          'pa-5' : $vuetify.breakpoint.mdAndUp
        }"
      >
        <v-layout
          column
          align-center
          justify-center
        >
          <v-card flat style="max-width:600px">
            <h1 class="display-1 text-xs-center">
              Built for you
            </h1>
            <v-card-text class="text-xs-center">
              Requestly is designed for everyone and anyone.
              Any process that has multiple stages where many people are collaberating
              can be smoothed out with Requestly.
            </v-card-text>
          </v-card>
          <v-img
            :src="require('@/assets/building_blocks.svg')"
            max-width="60%"
          />
          <v-layout
              row
              wrap
              align-center
              justify-center
              fill-height
              class="mt-3"
            >
            <v-flex xs12 md4>
              <v-card flat>
                <v-card-title class="title">
                  Accept and manage inquries
                </v-card-title>
                <v-card-text>
                  Feature suggestions, bug reports, tasks, discussion topics, etc...
                  Requestly helps manage any type of inqury.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card flat>
                <v-card-title class="title">
                  Invite your team, clients, shareholders, and the public
                </v-card-title>
                <v-card-text>
                  Open your request board to the people that matter most for your scenario.
                  Invite a select few to collaborate, or let anyone on the web join!
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card flat>
                <v-card-title class="title">
                  Keep everyone on the same page
                </v-card-title>
                <v-card-text>
                  Email wasn't intended for group discussions, and issues get buried in slack.
                  Requestly keeps discussions clear for all parties and all participates up to date.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex class="pa-4 text-xs-center">
              <v-btn
                depressed
                large
                class="primary"
                to="/usecases"
                >
                See use cases
              </v-btn>
            </v-flex>
            <v-flex xs12 grow class="ma-5">
              <v-divider/>
            </v-flex>
            <v-flex xs12>
              <h1 class="display-1 text-xs-center mb-3">
                Integrations
              </h1>
              <v-layout
                align-center
                justify-center
              >
                <v-flex class="text-xs-center" shrink>
                  <img :src="require('@/assets/slack.png')" width="100" />
                  <p class="caption">Slack</p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-sheet>
    </section>

  </v-container>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style>
#skew-background-1 {
  width: 200vw;
  height: 100vh;
  background-color: white;
  position: absolute;
  right: -100vw;
  top: 70vh;
  transform: skew(30deg, -30deg);
}
#skew-background-2 {
  width: 200vw;
  height: 120vh;
  background-color: #ffa726;
  position: absolute;
  left: -50vw;
  top: 135vh;
  transform: skew(-10deg, 10deg);
}
</style>
