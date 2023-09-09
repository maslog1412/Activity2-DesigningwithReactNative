import React, { useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TextInput, Pressable } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const YouTubeNewsfeed = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNewsfeed, setFilteredNewsfeed] = useState([]);

  const newsfeedData = [
    {
      id: 1,
      title: 'Cookiezi | xi - FREEDOM DiVE [FOUR DIMENSIONS] HDHR FC 99.83% 800pp | Livestream w/ chat reaction!',
      description: 'Circle People * 3.6M views * 6 years ago',
      thumbnail: require('./assets/images/FDFD.jpg'),
    },
    {
      id: 2,
      title: 'Cookiezi | xi - Blue Zenith [FOUR DIMENSIONS] +HD,HR 99.09% 2364/2402x 2x miss 727pp #1 | Livestream',
      description: 'Circle People * 223k views * 6 years ago',
      thumbnail: require('./assets/images/meme727pp.jpg'),
    },
    {
      id: 3,
      title: 'osu! | Vaxei | Wakeshima Kanon - Tsukinami [Nostalgia] +HD,DT 99.42% FC 1,023pp | FIRST 1K PP SCORE!',
      description: 'Circle People * 887k views * 4 years ago',
      thumbnail: require('./assets/images/1000pp.jpg'),
    },
    {
      id: 4,
      title: 'This Team Made osu! History',
      description: 'Kibitz * 354K views * 5 months ago',
      thumbnail: require('./assets/images/teamPH.jpg'),
    },
    {
      id: 5,
      title: 'How Dokito\'s YOMI YORI was ALMOST FCed...',
      description: 'BTMC * 724K views * 2 years ago',
      thumbnail: require('./assets/images/EdChoke.jpg')
    },
  ];

  const handlePeopleIconPress = () => {
    console.log('People icon pressed');
  };

  const filterNewsfeed = (query) => {
    const filteredItems = newsfeedData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNewsfeed(filteredItems);
  };

  const handleSearchInputChange = (text) => {
    setSearchQuery(text);
    filterNewsfeed(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isSearching && (
          <View style={styles.logoContainer}>
            <FontAwesome5Icon name="youtube" size={40} color="red" style={styles.youtubeIcon} />
            <Text style={styles.logoText}>YouTube</Text>
          </View>
        )}

        {isSearching ? (
          <View style={styles.searchBarContainer}>
            <FontAwesome5Icon
              name="arrow-left"
              size={24}
              color="#000"
              style={styles.arrowBackIcon}
              onPress={() => {
                setIsSearching(false);
                setSearchQuery('');
                setFilteredNewsfeed([]);
              }}
            />
            <TextInput
              placeholder="Search YouTube"
              style={styles.searchBar}
              onBlur={() => setIsSearching(false)}
              onChangeText={handleSearchInputChange}
              value={searchQuery}
            />
          </View>
        ) : (
          <Pressable onPress={() => setIsSearching(true)}>
            {({ pressed }) => (
              <View style={styles.iconContainer}>
                <FontAwesome5Icon
                  name="search"
                  size={24}
                  color={pressed ? '#555' : '#000'}
                  style={styles.searchIcon}
                />
                {!isSearching && (
                  <Pressable onPress={handlePeopleIconPress}>
                    {({ pressed }) => (
                      <FontAwesome5Icon
                        name="users"
                        size={24}
                        color="#000"
                        style={styles.peopleIcon}
                      />
                    )}
                  </Pressable>
                )}
              </View>
            )}
          </Pressable>
        )}
      </View>

      {!isSearching ? (
        <ScrollView style={styles.newsfeed}>
          {newsfeedData.map((item) => (
            <View key={item.id} style={styles.newsItem}>
              <Image source={item.thumbnail} style={styles.thumbnail} />

              <View style={styles.newsText}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.newsfeed}>
          {filteredNewsfeed.map((item) => (
            <View key={item.id} style={styles.newsItem}>
              <Image source={item.thumbnail} style={styles.thumbnail} />

              <View style={styles.newsText}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const HomeScreen = () => {
  return (
    <YouTubeNewsfeed />
  );
};
const ShortsScreen = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};
const Subscriptions = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};
const LibraryScreen = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBarOptions={{
          style: {
            height: 70,
            padding: 10,
          },
          labelStyle: {
            fontSize: 14,
          },
          activeTintColor: 'black',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5Icon name="home" size={size} color={'black'} />
            ),
          }}
        />
        <Tab.Screen
          name="Shorts"
          component={ShortsScreen}
          options={{
            tabBarLabel: 'Shorts',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5Icon name="play" size={size} color={'black'} />
            ),
          }}
        />
        <Tab.Screen
          name="Subscriptions"
          component={Subscriptions}
          options={{
            tabBarLabel: 'Subscriptions',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5Icon name="rss" size={size} color={'black'} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarLabel: 'Library',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5Icon name="book" size={size} color={'black'} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  youtubeIcon: {
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  arrowBackIcon: {
    fontSize: 24,
    color: '#000',
  },
  peopleIcon: {
    fontSize: 24,
    color: '#000',
  },
  newsfeed: {
    flex: 1,
  },
  newsItem: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  newsText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default App;
