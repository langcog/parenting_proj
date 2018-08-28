## ----------------------------------------------------------------------------
## Author: Jason Morgan (borrowing heavily from code contained in Martin Elff's
##         memisc package).
##
## Notes:  Additional methods for mtable formatting of lme4 model
##         objects. Requires that the memisc package be loaded prior to
##         sourcing these functions.
## ----------------------------------------------------------------------------

setSummaryTemplate(mer = c("Log-likelihood" = "($logLik:f#)",
                     "Deviance" = "($deviance:f#)",
                     "AIC" = "($AIC:f#)",
                     "BIC" = "($BIC:f#)",
                     "N" = "($N:d)",
                     "Groups" = "($Groups:d)"))

getSummary.mer <- function (obj, alpha = 0.05, ...) {
  smry <- summary(obj)
  coef <- smry@coefs
  lower <- qnorm(p = alpha/2, mean = coef[, 1], sd = coef[,2])
  upper <- qnorm(p = 1 - alpha/2, mean = coef[, 1], sd = coef[,2])
  if (ncol(smry@coefs) == 3) {
    p <- (1 - pnorm(smry@coefs[, 3])) * 2
    coef <- cbind(coef, p, lower, upper)
  }
  else {
    coef <- cbind(coef, lower, upper)
  }
  RE <- smry@REmat
  ranef <- cbind(as.numeric(RE[,3]), as.numeric(RE[,4]), NA,NA,NA,NA)
  rownames(ranef) <- paste("Ranef", RE[,1], sep = " - ")
  coef <- rbind(coef, ranef)
  colnames(coef) <- c("est", "se", "stat", "p", "lwr", "upr")

  ## Factor levels.
  xlevels <- list()
  Contr <- names(attr(model.matrix(obj), "contrasts"))
  for (c in Contr) xlevels[[c]] <- levels(obj@frame[,c])

  ## Model fit statistics.
  ll <- logLik(obj)[1]
  deviance <- deviance(obj)
  AIC <- AIC(obj)
  BIC <- BIC(obj)
  N <- as.numeric(smry@dims["n"])
  G <- as.numeric(smry@ngrps)
  sumstat <- c(logLik = ll, deviance = deviance, AIC = AIC,
               BIC = BIC, N = N, Groups = G)

  ## Return model summary.
  list(coef = coef, sumstat = sumstat,
       contrasts = attr(model.matrix(obj), "contrasts"),
       xlevels = xlevels, call = obj@call)
}

## ----------------------------------------------------------------------------
