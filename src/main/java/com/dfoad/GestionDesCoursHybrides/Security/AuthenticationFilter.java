package com.dfoad.GestionDesCoursHybrides.Security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dfoad.GestionDesCoursHybrides.service.JwtService;

/**
 * La classe AuthenticationFilter est un filtre Spring Security qui intercepte
 * chaque requête HTTP
 * pour extraire le jeton JWT d'en-tête Authorization et authentifier
 * l'utilisateur en fonction de ce jeton.
 */
@Component
public class AuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtService jwtService;

	/**
	 * Méthode pour filtrer chaque requête HTTP et gérer l'authentification.
	 * 
	 * @param request     La requête HTTP entrante.
	 * @param response    La réponse HTTP sortante.
	 * @param filterChain Le filtre de chaîne pour continuer le traitement de la
	 *                    requête.
	 * @throws ServletException Si une erreur de servlet se produit.
	 * @throws IOException      Si une erreur d'entrée-sortie se produit.
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain)
			throws ServletException, IOException {

		// Obtenir le jeton depuis l'en-tête Authorization
		String jws = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (jws != null) {
			// Vérifier le jeton et obtenir l'utilisateur
			String user = jwtService.getAuthUser(request);

			// Authentifier l'utilisateur
			Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
					java.util.Collections.emptyList());

			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		// Continuer le traitement de la requête
		filterChain.doFilter(request, response);
	}
}
