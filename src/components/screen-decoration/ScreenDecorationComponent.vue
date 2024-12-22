<template>
  <div class="topBorder">
    <span class="l mr-10 w-40"></span>
    <span class="l mr-10"></span>
    <span class="l mr-10"></span>
    <span class="l mr-10"></span>
    <span class="l mr-10"></span>
    <span class="r ml-10 w-40"></span>
    <span class="r ml-10"></span>
    <span class="r ml-10"></span>
    <span class="r ml-10"></span>
    <span class="r ml-10"></span>
  </div>
  <h1>{{ title }}</h1>
  <div class="view">
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <p></p>
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <p></p>
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
  </div>
  <div class="view l">
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <p></p>
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <em></em>
    <TileComponent :tile="filledTile" />
    <p></p>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
    <div class="clear"></div>
    <TileComponent :tile="filledTile" />
  </div>
</template>

<script setup lang="ts">
import { FilledTile } from '@/interface/tile/filled-tile'
import TileComponent from '../tile/TileComponent.vue'

const title = 'Tetris'
const filledTile = new FilledTile()
</script>

<style lang="scss" src="./screen-decoration.component.scss"></style>
