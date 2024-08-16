import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button, Alert,
} from "@mui/material";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import DeepLinkResolver from "src/common/DeepLinkResolver.jsx";
import cExplorerLogo from "/assets/cexplorer.png";
import cardanoScanLogo from "/assets/cardano-scan.png";
import poolPmLogo from "/assets/pool-pm.png";
import eutxoLogo from "/assets/eutxo.png";
import adaStatLogo from "/assets/adastat.png";
import betaExplorer from "/assets/beta-explorer.png";
import poolTool from "/assets/poolTool.png";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CardanoExplorer = () => {
  const acceptedDeepLinks = ["transaction", "block", "epoch", "address"];
  const query = useQuery();
  const path = useLocation().pathname.split("/").reverse()[0]
  const isDeepLink = acceptedDeepLinks.includes(path);
  const deepLinkResolver = new DeepLinkResolver(path, query);

  const explorers = {
    cExplorer: {
      name: "Cexplorer.io",
      description:
        "cexplorer.io is the oldest and most featured explorer on Cardano network since Incentivised Testnet ages.",
      image: cExplorerLogo,
      url: deepLinkResolver.getCExplorerLink("https://cexplorer.io/"),
      isDeepLink: true
    },
    cardanoScan: {
      name: "Cardano Scan",
      description:
        "A combination of block explorer and pool tool, uses it&epos;s own implementation of db-sync.",
      url: deepLinkResolver.getCardanoScanLink("https://cardanoscan.io/"),
      image: cardanoScanLogo,
      isDeepLink: true
    },
    poolPM: {
      name: "Pool PM",
      description:
        "Block explorer that brought out a new, refreshing concept to visualize transactions.",
      url: "https://pool.pm/",
      image: poolPmLogo,
      isDeepLink: false
    },
    eUTxO: {
      name: "eUTxO",
      description: "Visual blockchain explorer for Cardano.",
      url: "https://eutxo.org/",
      image: eutxoLogo,
      isDeepLink: false
    },
    adaStat: {
      name: "AdaStat",
      description:
        "The browser, inconspicuous at first glance, offers a great many statistics and insights.",
      url: "https://adastat.net/",
      image: adaStatLogo,
      isDeepLink: false
    },
    explorer: {
      name: "Explorer (Beta)",
      description:
        "A Cardano explorer built by Cardano Foundation, currently under development",
      url: deepLinkResolver.getCFBetaExplorerLink("https://beta.explorer.cardano.org/en/"),
      image: betaExplorer,
      isDeepLink: true
    },
    poolTool: {
      name: "PoolTool",
      description: "One of the most feature-rich, unbiased pool tools. Also offers a native app.",
      url: "https://pooltool.io/",
      image: poolTool,
      isDeepLink: false
    }
  };

  const selectedExplorer = explorers[path] || explorers[query.get("section")];

  const explorerCards = Object.entries(explorers).map(([key, explorer]) => (
    <Grid item xs={12} sm={6} md={4} key={key}>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 321,
          margin: 1,
          borderRadius: '4px',
          overflow: "hidden",
          opacity: isDeepLink && !explorer.isDeepLink ? 0.5 : 1,
          boxShadow: 8
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={explorer.image}
          alt={explorer.name}
          sx={{
            width: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative"

          }}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {explorer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {explorer.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={isDeepLink && !explorer.isDeepLink}
            component={Link}
            to={`${explorer.url}${query.get("value") || ""}`}
            size="small"
          >
            Continue
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ));

  return (
    <>
      <Header />

      <Container maxWidth="lg" style={{ marginTop: "10px" }}>
        <Typography
          variant="h6"
          gutterBottom
        >
          Select the Explorer of your choice:
          {isDeepLink &&
              <Alert severity={"info"}>You will be forwarded to {path} {deepLinkResolver.getValue()} after choosing your favorite Explorer</Alert>
          }
        </Typography>
        <Grid container spacing={3}>
          {selectedExplorer ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {selectedExplorer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedExplorer.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`${selectedExplorer.baseLink}${
                      query.get("value") || ""
                    }`}
                    size="small"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ) : (
            explorerCards
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div>
      <CardanoExplorer />
    </div>
  );
}

export default App;
