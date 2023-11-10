---
title: Getting Started
description: Quickly get setup using Search Anything
sidebar:
  order: 1
---

Using SearchAnything is very easy. In this guide you will get a sample rapid document search set up through creating an access token, and importing some sample [recipe data](https://recipenlg.cs.put.poznan.pl/). The same process can be used for indexing your own content.

## Access Token

First step will be creating an `admin` access token. If you haven't already, sign up and create a **free** account, next go to the [dashboard](https://searchanything.vercel.app/dashboard) page and click on *Create token* button and select *Create admin token*.

Save your access token to an environment variable for later use:

```shell
// bash
export SA_ADMIN_TOKEN="sal_aaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaa"

// powershell
$Env:SA_ADMIN_TOKEN="sal_aaaaaaaaaaaaaaaaaaaaa.aaaaaaaaaaaaaaaaaaaa"
```

![Get token](../../../assets/get_token.gif)

## Import recipes

Next will be importing the recipes for indexing, you can download a sample dataset of 5k recipes [here](https://gist.github.com/JayJamieson/2fe81f98e63d6166c47e34caa46a5786). Alternatively use your own data formatted using the [JSON Lines](https://jsonlines.org/) text format.

First lets look at a sample of the recipes data.

```json
{"title":"No-Bake Nut Cookies","ingredients":["1 c. firmly packed brown sugar","1/2 c. evaporated milk","1/2 tsp. vanilla","1/2 c. broken nuts (pecans)","2 Tbsp. butter or margarine","3 1/2 c. bite size shredded rice biscuits"],"directions":["In a heavy 2-quart saucepan, mix brown sugar, nuts, evaporated milk and butter or margarine.","Stir over medium heat until mixture bubbles all over top.","Boil and stir 5 minutes more. Take off heat.","Stir in vanilla and cereal; mix well.","Using 2 teaspoons, drop and shape into 30 clusters on wax paper.","Let stand until firm, about 30 minutes."],"link":"www.cookbooks.com/Recipe-Details.aspx?id=44874","keywords":["brown sugar","milk","vanilla","nuts","butter","bite size shredded rice biscuits"]}
```

## Indexing

Indexing is very important when it comes to searching through large datasets. In the sample recipe data our chefs would most of the time be searching by the *"title"* property of a recipe, which means it would make sense to index this. To do this you specify a `content` query parameter with the *"title"* key as the value.

We can use the following `cURL` command to do this for us.

```shell
curl --request POST \
  --url "https://search.jaythedeveloper.tech/api/collections/import?content=title" \
  --header "Authorization: $SA_ADMIN_TOKEN" \
  --header "Content-Type: application/octet-stream" \
  --data-binary @recipe_5k.jsonl
```

## Searching

Awesome, you now have 5k recipes indexed in a single `cURL` command. Now let's search the recipe collection for something tasty.

We can do this using the following command. Take note that the search term is a `q` query parameter just like Google. Let's search for *Chicken salad* recipes and see what is available.

```shell
curl --request GET \
  --url "https://search.jaythedeveloper.tech/api/collections/search?q=Chicken%20salad&limit=50" \
  --header "Authorization: $SA_ADMIN_TOKEN"
```

If using the sample data set, you will see the following yummy recipe in record time:
```json
{
 "Count": 46,
 "Limit": 50,
 "Offset": 0,
 "Hits": [
  {
   "_id": 115,
   "match": "Pasta <b>Chicken</b> <b>Salad</b>(268 Calories",
   "raw_content": "{\"title\":\"Pasta Chicken Salad(268 Calories Per Serving)  \",\"ingredients\":[\"3 1/2 c. (8 oz.) large shells (uncooked)\",\"2 c. cubed, cooked chicken (light meat)\",\"2 c. fresh, raw broccoli flowerets\",\"2 c. fresh, raw cauliflower\",\"1 c. sliced carrots\",\"1 c. sliced green onions\",\"1/2 lb. fresh mushrooms, sliced\",\"1 c. (8 oz. bottle) reduced calorie creamy Italian salad dressing\",\"3/4 c. skim milk\",\"salt and pepper to taste\"],\"directions\":[\"Cook large shells according to package directions.\",\"Drain and cool (rinse with cold water to cool quickly, then drain well). Combine cooled large shells with remaining ingredients and toss lightly.\",\"Chill.\",\"Makes 8 servings.\"],\"link\":\"www.cookbooks.com/Recipe-Details.aspx?id=312742\",\"keywords\":[\"shells\",\"chicken\",\"broccoli flowerets\",\"cauliflower\",\"carrots\",\"green onions\",\"fresh mushrooms\",\"Italian salad dressing\",\"milk\",\"salt\"]}"
  },
  // rest of response redacted for brevity ......
 "Query": "Chicken salad",
 "QueryTimeMs": 15
```

## Clean-up

If you used the sample recipe data and wondering how to clean-up, a quick and simple way is to re-`init` your index.

This command will force initialize an empty index, any data indexed will be **deleted and cannot be retrieved**.

```shell
curl --request POST \
  --url "https://search.jaythedeveloper.tech/api/collections/init?force=force" \
  --header "Authorization: $SA_ADMIN_TOKEN" \
```
