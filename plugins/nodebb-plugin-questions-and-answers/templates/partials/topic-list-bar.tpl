<div class="{{{ if config.theme.stickyToolbar }}}sticky-tools{{{ end }}} mb-3">
	<nav class="topic-list-header d-flex flex-nowrap my-2 p-0 border-0 rounded">
		<div class="d-flex flex-row p-2 text-bg-light gap-1 border rounded w-100 align-items-center">
			<div component="category/controls" class="d-flex me-auto mb-0 gap-2 flex-wrap">
				{{{ if template.category }}}
				<!-- IMPORT partials/category/watch.tpl -->
				<!-- IMPORT partials/tags/filter-dropdown-left.tpl -->
				{{{ end }}}

				{{{ if isQA }}}
                <!-- IMPORT partials/tags/filter-dropdown-left_2.tpl -->
                {{{ end }}}

				{{{ if template.category }}}
				<!-- IMPORT partials/category/sort.tpl -->
				{{{ end }}}

				{{{ if (template.popular || template.top)}}}
				<!-- IMPORT partials/topic-terms.tpl -->
				{{{ end }}}
				{{{ if (template.unread || (template.recent || (template.popular || template.top))) }}}
				<!-- IMPORT partials/topic-filters.tpl -->
				<!-- IMPORT partials/category/filter-dropdown-left.tpl -->
				<!-- IMPORT partials/tags/filter-dropdown-left.tpl -->
				{{{ end }}}
				{{{ if template.unread }}}
				<div class="markread btn-group {{{ if !topics.length }}}hidden{{{ end }}}">
					<!-- IMPORT partials/category/selector-dropdown-left.tpl -->
				</div>
				{{{ end }}}
				{{{ if template.tag }}}
				<!-- IMPORT partials/category/filter-dropdown-left.tpl -->
				<!-- IMPORT partials/tags/watch.tpl -->
				{{{ end }}}
				<!-- IMPORT partials/category/tools.tpl -->

				{{{ if (!feeds:disableRSS && rssFeedUrl) }}}
				<a class="btn-ghost-sm d-none d-lg-flex align-self-stretch" target="_blank" href="{rssFeedUrl}" itemprop="item" title="[[global:rss-feed]]"><i class="fa fa-rss text-primary"></i></a>
				{{{ end }}}

				<a href="{{{ if template.category }}}{url}{{{ else }}}{config.relative_path}/{selectedFilter.url}{querystring}{{{ end }}}" class="btn btn-secondary fw-semibold position-absolute top-100 translate-middle-x start-50 mt-1 hide" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" id="new-topics-alert">
					<i class="fa fa-fw fa-arrow-up"></i> [[recent:load-new-posts]]
				</a>
			</div>
			<div style="display: flex; justify-content: center; align-items: center;">
				{{{if isQA}}}
					<form id="search-form" method="get" style="margin-right: 30px;">
						<input type="text" id="search-input" name="q" placeholder="Buscar..." />
						<button type="submit">Buscar</button>
					</form>
				{{{ end }}}
			</di>
			<div class="d-flex gap-1 align-items-center">
				{{{ if template.category }}}
					{{{if isQA}}}
						<button class="btn btn-primary btn-sm text-nowrap" id="filter_my_questions" >My Questions</button>
					{{{ end }}}
					{{{ if privileges.topics:create }}}
					<a href="{config.relative_path}/compose?cid={cid}" component="category/post" id="new_topic" class="btn btn-primary btn-sm text-nowrap" data-ajaxify="false" role="button">
                    {{{if !isQA}}}[[category:new-topic-button]]{{{else}}}New Question{{{end}}}</a>
					{{{ end }}}
				{{{ else }}}
					{{{ if canPost }}}
					<!-- IMPORT partials/buttons/newTopic.tpl -->
					{{{ end }}}
				{{{ end }}}
				<!-- only show login button if not logged in and doesn't have any posting privilege -->
				{{{ if (!loggedIn && (!privileges.topics:create && !canPost))}}}
				<a component="category/post/guest" href="{config.relative_path}/login" class="btn btn-sm btn-primary">[[category:guest-login-post]]</a>
				{{{ end }}}
			</div>
		</div>
	</nav>
</div>
<div id="search-results">
	<!-- Aquí se agregarán dinámicamente las preguntas asociadas a la búsqueda. -->
</div>
<div id="questions-container" style="
    margin-top: 5px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    display: none; /* Ocultar inicialmente */
">
    <!-- Aquí se agregarán dinámicamente más tarjetas de preguntas -->
</div>