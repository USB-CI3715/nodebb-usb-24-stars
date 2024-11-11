<div class="course-tag-filter">
    <button type="button" class="btn-ghost-sm ff-secondary d-flex gap-2 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-fw fa-tags text-primary"></i>
        <span class="visible-md-inline visible-lg-inline fw-semibold" id="selectedTagLabel">All Courses</span>
    </button>

    <div class="dropdown-menu">
        <ul id="tag-list" class="list-unstyled mb-0" style="max-height: 300px; overflow-y: auto;">
            <li>
                <a class="dropdown-item" href="#" data-tag="">All Courses</a>
            </li>
            <!-- Las etiquetas se llenarán dinámicamente aquí -->
        </ul>
    </div>

    <input type="text" id="courseTagInput" class="form-control form-control-sm" placeholder="Buscar etiqueta..." style="display:none;">
</div>