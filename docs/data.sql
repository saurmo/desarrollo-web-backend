BEGIN;

-- ==============================================================================
-- 1. INSERTAR COMODIDADES BASE (Catalog)
-- ==============================================================================
INSERT INTO comodities (id, name, description, state, created_by) VALUES
('com-001', 'Jacuzzi Privado', 'Jacuzzi de hidromasaje climatizado al aire libre', 'ACTIVE', 'usr-admin-01'),
('com-002', 'Piscina Infinity', 'Piscina privada con vista panorámica', 'ACTIVE', 'usr-admin-01'),
('com-003', 'Malla Catamarán', 'Malla suspendida para relajación y vista a la naturaleza', 'ACTIVE', 'usr-admin-01'),
('com-004', 'Zona de Fogata', 'Espacio exterior para fogatas nocturnas equipada con leña', 'ACTIVE', 'usr-admin-01'),
('com-005', 'Wifi Starlink', 'Internet satelital de alta velocidad ideal para teletrabajo', 'ACTIVE', 'usr-admin-01'),
('com-006', 'Zona BBQ / Asador', 'Asador a carbón o gas con utensilios completos', 'ACTIVE', 'usr-admin-01'),
('com-007', 'Pet Friendly', 'Alojamiento acondicionado y pet-friendly', 'ACTIVE', 'usr-admin-01'),
('com-008', 'Cocina Equipada', 'Cocina con electrodomésticos, vajilla y utensilios', 'ACTIVE', 'usr-admin-01'),
('com-009', 'Parqueadero Privado', 'Estacionamiento cubierto y privado dentro de la propiedad', 'ACTIVE', 'usr-admin-01'),
('com-010', 'Sendero Ecológico', 'Acceso a senderos privados para caminatas en la naturaleza', 'ACTIVE', 'usr-admin-01');

-- ==============================================================================
-- 2. INSERTAR CATEGORÍAS BASE (Catalog)
-- ==============================================================================
INSERT INTO categories (id, name, description, state, created_by) VALUES
('cat-001', 'Glamping', 'Alojamientos de lujo inmersos en la naturaleza', 'ACTIVE', 'usr-admin-01'),
('cat-002', 'Cabañas Alpinas', 'Diseños en madera y estilo A-Frame para clima frío', 'ACTIVE', 'usr-admin-01'),
('cat-003', 'Fincas Tradicionales', 'Grandes propiedades para grupos y familias', 'ACTIVE', 'usr-admin-01'),
('cat-004', 'Escapada Romántica', 'Alojamiento privado diseñado para parejas', 'ACTIVE', 'usr-admin-01'),
('cat-005', 'Casas del Árbol', 'Estructuras elevadas entre la vegetación', 'ACTIVE', 'usr-admin-01'),
('cat-006', 'Villas de Lujo', 'Propiedades con acabados de alta gama y comodidades premium', 'ACTIVE', 'usr-admin-01');

-- ==============================================================================
-- 3. INSERTAR 100 LISTINGS GENERADOS DINÁMICAMENTE
-- ==============================================================================
INSERT INTO listings (
    id,
    name,
    location,
    price,
    capacity,
    weather,
    rating,
    photos,
    videos,
    state,
    created_at,
    created_by
)
SELECT
    'lst-' || LPAD(i::text, 3, '0') AS id,
    
    -- Nombre combinando tipos y adjetivos
    (ARRAY['Cabaña', 'Finca', 'Glamping', 'Refugio', 'Villa', 'Eco-Lodge'])[floor(random() * 6 + 1)] || ' ' ||
    (ARRAY['El Paraíso', 'Mirador', 'Los Pinos', 'San José', 'La Soñada', 'Vista Hermosa', 'Altos del Valle', 'Las Acacias', 'El Encanto', 'Santuario'])[floor(random() * 10 + 1)] || ' ' || i AS name,
    
    -- Ubicación
    (ARRAY[
        'Guatavita, Cundinamarca', 
        'Santa Elena, Antioquia', 
        'Villa de Leyva, Boyacá', 
        'San Gil, Santander', 
        'Salento, Quindío', 
        'Anapoima, Cundinamarca', 
        'Jardín, Antioquia', 
        'Palomino, La Guajira'
    ])[floor(random() * 8 + 1)] AS location,
    
    -- Precio (entre 150,000 y 1,200,000 en pasos de 10,000)
    (floor(random() * 105 + 15) * 10000)::DECIMAL(10,2) AS price,
    
    -- Capacidad (entre 2 y 16 personas)
    floor(random() * 15 + 2)::INT AS capacity,
    
    -- Clima
    (ARRAY['Frío (12°C - 16°C)', 'Templado (18°C - 22°C)', 'Cálido (24°C - 30°C)'])[floor(random() * 3 + 1)] AS weather,
    
    -- Calificación (entre 4.0 y 5.0)
    ROUND((random() * 1.0 + 4.0)::numeric, 2) AS rating,
    
    -- Photos (JSONB con 3 URLs de ejemplo Unsplash)
    jsonb_build_array(
        'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80'
    ) AS photos,
    
    -- Videos (JSONB opcional en algunos registros)
    CASE 
        WHEN i % 3 = 0 THEN jsonb_build_array('https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4')
        ELSE '[]'::jsonb
    END AS videos,
    
    -- State (90% ACTIVE, 5% DRAFT, 5% MAINTENANCE)
    (ARRAY['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'DRAFT', 'MAINTENANCE'])[floor(random() * 6 + 1)] AS state,
    
    -- Fecha aleatoria dentro de los últimos 365 días
    CURRENT_TIMESTAMP - (random() * interval '365 days') AS created_at,
    
    'usr-admin-01' AS created_by

FROM generate_series(1, 100) AS i;

-- ==============================================================================
-- 4. POBLAR RELACIÓN MUCHOS A MUCHOS: LISTING_COMODITIES
-- Asigna entre 2 y 5 comodidades aleatorias a cada uno de los 100 listings
-- ==============================================================================
INSERT INTO listing_comodities (listing_id, comodity_id)
SELECT DISTINCT
    l.id AS listing_id,
    c.id AS comodity_id
FROM listings l
CROSS JOIN LATERAL (
    SELECT id FROM comodities 
    ORDER BY random() 
    LIMIT floor(random() * 4 + 2) -- Entre 2 y 5 comodidades
) c;

-- ==============================================================================
-- 5. POBLAR RELACIÓN MUCHOS A MUCHOS: LISTING_CATEGORIES
-- Asigna entre 1 y 2 categorías aleatorias a cada uno de los 100 listings
-- ==============================================================================
INSERT INTO listing_categories (listing_id, category_id)
SELECT DISTINCT
    l.id AS listing_id,
    cat.id AS category_id
FROM listings l
CROSS JOIN LATERAL (
    SELECT id FROM categories 
    ORDER BY random() 
    LIMIT floor(random() * 2 + 1) -- Entre 1 y 2 categorías
) cat;

COMMIT;