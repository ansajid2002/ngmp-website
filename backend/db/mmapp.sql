PGDMP      -                {            mmapp    16.0    16.0    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            @           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            A           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            B           1262    16720    mmapp    DATABASE     x   CREATE DATABASE mmapp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE mmapp;
                postgres    false                        3079    16721 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            C           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2                       1255    17696    next_transaction_id()    FUNCTION     �   CREATE FUNCTION public.next_transaction_id() RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    next_id INT;
BEGIN
    SELECT nextval('transactions_id_seqs') INTO next_id;
    RETURN next_id; 
END;
$$;
 ,   DROP FUNCTION public.next_transaction_id();
       public          postgres    false            �            1259    16731 
   attributes    TABLE     �   CREATE TABLE public.attributes (
    attribute_id integer NOT NULL,
    attribute_name character varying(255) NOT NULL,
    attribute_values text[],
    category text,
    subcategory text
);
    DROP TABLE public.attributes;
       public         heap    postgres    false            �            1259    16736    attributes_attribute_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attributes_attribute_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.attributes_attribute_id_seq;
       public          postgres    false    216            D           0    0    attributes_attribute_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.attributes_attribute_id_seq OWNED BY public.attributes.attribute_id;
          public          postgres    false    217            �            1259    16737    audioheadphones    TABLE     	  CREATE TABLE public.audioheadphones (
    product_ah_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    subcategory text,
    condition text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    driversize character varying(255),
    impedance character varying(255),
    frequencyrange character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 #   DROP TABLE public.audioheadphones;
       public         heap    postgres    false            �            1259    16747 "   audio_headphones_product_ah_id_seq    SEQUENCE     �   CREATE SEQUENCE public.audio_headphones_product_ah_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.audio_headphones_product_ah_id_seq;
       public          postgres    false    218            E           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE OWNED BY     h   ALTER SEQUENCE public.audio_headphones_product_ah_id_seq OWNED BY public.audioheadphones.product_ah_id;
          public          postgres    false    219            �            1259    16748    cameraphotography    TABLE     ;  CREATE TABLE public.cameraphotography (
    product_cp_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subcategory character varying(255),
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    condition text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    modelname character varying(255),
    storagetype character varying(255),
    storagecapacity character varying(255),
    displaysize character varying(255),
    screenresolution character varying(255),
    connectivityports character varying(255),
    batterylife character varying(255),
    dimensions character varying(255),
    weight numeric(10,2),
    warrantyinformation character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 %   DROP TABLE public.cameraphotography;
       public         heap    postgres    false            �            1259    16758 $   camera_photography_product_cp_id_seq    SEQUENCE     �   CREATE SEQUENCE public.camera_photography_product_cp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.camera_photography_product_cp_id_seq;
       public          postgres    false    220            F           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE OWNED BY     l   ALTER SEQUENCE public.camera_photography_product_cp_id_seq OWNED BY public.cameraphotography.product_cp_id;
          public          postgres    false    221            �            1259    16759    cart    TABLE     �  CREATE TABLE public.cart (
    cart_id integer NOT NULL,
    customer_id integer,
    vendor_id integer,
    product_uniqueid character varying(255) NOT NULL,
    category character varying(255),
    subcategory character varying(255),
    quantity integer NOT NULL,
    addeddate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updateddate timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    variantlabel text,
    mrp text,
    sellingprice text
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    16766    cart_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_cart_id_seq;
       public          postgres    false    222            G           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.cart.cart_id;
          public          postgres    false    223            �            1259    16767 
   categories    TABLE     �  CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(255) NOT NULL,
    category_description text,
    category_image_url character varying(255),
    category_status boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    category_type character varying(255)
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    16775    categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.categories_category_id_seq;
       public          postgres    false    224            H           0    0    categories_category_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;
          public          postgres    false    225            �            1259    16776    clothing    TABLE     �  CREATE TABLE public.clothing (
    product_fac_id integer NOT NULL,
    ad_title character varying(255) NOT NULL,
    additionaldescription text,
    countryoforigin character varying(255) NOT NULL,
    manufacturername character varying(255) NOT NULL,
    packerdetails character varying(255) NOT NULL,
    searchkeywords text,
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255) NOT NULL,
    city character varying(255),
    state character varying(255),
    mrp double precision,
    sellingprice double precision,
    quantity integer,
    inthebox character varying(255),
    isvariant character varying(255),
    status integer DEFAULT 0,
    category_type character varying(255),
    currency_symbol text,
    uniquepid text,
    vendorid integer,
    postalcode text,
    country text,
    category text,
    subcategory text,
    skuid text,
    images text[]
);
    DROP TABLE public.clothing;
       public         heap    postgres    false                       1259    17600    conversations    TABLE     �   CREATE TABLE public.conversations (
    conversation_id integer NOT NULL,
    customer_id integer NOT NULL,
    vendor_id integer NOT NULL,
    conversation_user_type text NOT NULL
);
 !   DROP TABLE public.conversations;
       public         heap    postgres    false                       1259    17599 !   conversations_conversation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.conversations_conversation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.conversations_conversation_id_seq;
       public          postgres    false    275            I           0    0 !   conversations_conversation_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.conversations_conversation_id_seq OWNED BY public.conversations.conversation_id;
          public          postgres    false    274            �            1259    16782    coupons    TABLE     >  CREATE TABLE public.coupons (
    coupon_id integer NOT NULL,
    coupon_code character varying(20) NOT NULL,
    discount_type character varying(20) NOT NULL,
    discount_amount numeric(10,2) NOT NULL,
    expiration_date date NOT NULL,
    vendorid integer,
    associated_products text[],
    created_date date
);
    DROP TABLE public.coupons;
       public         heap    postgres    false            �            1259    16787    coupons_coupon_id_seq    SEQUENCE     �   CREATE SEQUENCE public.coupons_coupon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.coupons_coupon_id_seq;
       public          postgres    false    227            J           0    0    coupons_coupon_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.coupons_coupon_id_seq OWNED BY public.coupons.coupon_id;
          public          postgres    false    228            �            1259    16788    currency_values    TABLE     �   CREATE TABLE public.currency_values (
    id integer NOT NULL,
    usd numeric,
    kes numeric,
    eur numeric,
    etb numeric,
    sos numeric,
    inr numeric
);
 #   DROP TABLE public.currency_values;
       public         heap    postgres    false            �            1259    16793    currency_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.currency_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.currency_values_id_seq;
       public          postgres    false    229            K           0    0    currency_values_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.currency_values_id_seq OWNED BY public.currency_values.id;
          public          postgres    false    230                       1259    17057    customer_address    TABLE     C  CREATE TABLE public.customer_address (
    address_id integer NOT NULL,
    customer_id integer,
    given_name_address character varying(50),
    family_name_address character varying(50),
    email_address character varying(100),
    phone_address character varying(20),
    country_address character varying(50),
    zip_address character varying(15),
    city_address character varying(50),
    subregion_address character varying(50),
    region_address character varying(50),
    note_address text,
    default_address boolean,
    apt_address text,
    phone_code text
);
 $   DROP TABLE public.customer_address;
       public         heap    postgres    false                       1259    17056    customer_address_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_address_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.customer_address_address_id_seq;
       public          postgres    false    269            L           0    0    customer_address_address_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.customer_address_address_id_seq OWNED BY public.customer_address.address_id;
          public          postgres    false    268            �            1259    16794    customer_delivery_address    TABLE       CREATE TABLE public.customer_delivery_address (
    id integer NOT NULL,
    customer_id integer,
    first_name character varying(255),
    last_name character varying(255),
    selected_country character varying(255),
    street_address text,
    apartment character varying(255),
    selected_city character varying(255),
    selected_state character varying(255),
    zip_code character varying(20),
    email character varying(255),
    phone_number character varying(20),
    orderid integer,
    unique_order_id integer
);
 -   DROP TABLE public.customer_delivery_address;
       public         heap    postgres    false            �            1259    16799     customer_delivery_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_delivery_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.customer_delivery_address_id_seq;
       public          postgres    false    231            M           0    0     customer_delivery_address_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.customer_delivery_address_id_seq OWNED BY public.customer_delivery_address.id;
          public          postgres    false    232            �            1259    16800    customer_follows    TABLE     �   CREATE TABLE public.customer_follows (
    follow_id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL,
    follow_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 $   DROP TABLE public.customer_follows;
       public         heap    postgres    false            �            1259    16804    customer_follows_follow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_follows_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.customer_follows_follow_id_seq;
       public          postgres    false    233            N           0    0    customer_follows_follow_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.customer_follows_follow_id_seq OWNED BY public.customer_follows.follow_id;
          public          postgres    false    234            �            1259    16805    customer_wishlist    TABLE     {  CREATE TABLE public.customer_wishlist (
    wishlist_id integer NOT NULL,
    customer_id integer NOT NULL,
    uniqueid character varying(255),
    label character varying(255),
    category character varying(50),
    subcategory character varying(50),
    vendor_id integer,
    mrp double precision,
    sellingprice double precision,
    created_on character varying(255)
);
 %   DROP TABLE public.customer_wishlist;
       public         heap    postgres    false            �            1259    16810 !   customer_wishlist_wishlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customer_wishlist_wishlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.customer_wishlist_wishlist_id_seq;
       public          postgres    false    235            O           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.customer_wishlist_wishlist_id_seq OWNED BY public.customer_wishlist.wishlist_id;
          public          postgres    false    236            �            1259    16811 	   customers    TABLE     �  CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    given_name character varying(50) NOT NULL,
    family_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone_number character varying(20),
    address_line_1 character varying(100),
    address_line_2 character varying(100),
    city character varying(100),
    state character varying(100),
    zip_code character varying(100),
    country character varying(100),
    bio text,
    verified_with text[],
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status integer DEFAULT 0 NOT NULL,
    picture character varying(255),
    google_id character varying(255),
    facebook_id character varying(255),
    verification_code integer,
    verification_expire_date timestamp without time zone,
    customer_loggedid text,
    customer_interest text[]
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16819    customers_customer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.customers_customer_id_seq;
       public          postgres    false    237            P           0    0    customers_customer_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;
          public          postgres    false    238            �            1259    16820 "   fashionclothing_product_fac_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fashionclothing_product_fac_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.fashionclothing_product_fac_id_seq;
       public          postgres    false    226            Q           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.fashionclothing_product_fac_id_seq OWNED BY public.clothing.product_fac_id;
          public          postgres    false    239                       1259    17047 
   homebanner    TABLE     p   CREATE TABLE public.homebanner (
    id integer NOT NULL,
    banner_url text,
    title text,
    link text
);
    DROP TABLE public.homebanner;
       public         heap    postgres    false            
           1259    17046    homebanner_new_id_seq    SEQUENCE     �   CREATE SEQUENCE public.homebanner_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.homebanner_new_id_seq;
       public          postgres    false    267            R           0    0    homebanner_new_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.homebanner_new_id_seq OWNED BY public.homebanner.id;
          public          postgres    false    266            �            1259    16821    laptopcomputers    TABLE     <  CREATE TABLE public.laptopcomputers (
    product_lc_id integer NOT NULL,
    ad_title text NOT NULL,
    currency_symbol text NOT NULL,
    city text,
    state text,
    country text,
    brand text,
    category text,
    vendorid integer,
    is_featured boolean DEFAULT false NOT NULL,
    is_sold boolean DEFAULT false NOT NULL,
    is_negotiable boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    subcategory character varying(255),
    rejection_reason text,
    status integer DEFAULT 0,
    updated_at_product timestamp without time zone,
    uniquepid character varying(50),
    category_type character varying(255),
    condition text,
    skuid text,
    mrp text,
    sellingprice text,
    localdeliverycharge text,
    zonaldeliverycharge text,
    nationaldeliverycharge text,
    weightkg text,
    lengthcm text,
    breadthcm text,
    heightcm text,
    countryoforigin text,
    manufacturername text,
    packerdetails text,
    additionaldescription text,
    searchkeywords text,
    salespackage text,
    keyfeatures text,
    videourl text,
    modelname text,
    processor text,
    ram text,
    storagetype text,
    storagecapacity text,
    displaysize text,
    screenresolution text,
    graphicscard text,
    operatingsystem text,
    connectivityports text,
    batterylife text,
    keyboardtype text,
    touchpad text,
    dimensions text,
    weight text,
    warrantyinformation text,
    isvariant text,
    quantity integer,
    postalcode text,
    inthebox text,
    images text[]
);
 #   DROP TABLE public.laptopcomputers;
       public         heap    postgres    false            �            1259    16831 !   laptopcomputers_product_lc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.laptopcomputers_product_lc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.laptopcomputers_product_lc_id_seq;
       public          postgres    false    240            S           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.laptopcomputers_product_lc_id_seq OWNED BY public.laptopcomputers.product_lc_id;
          public          postgres    false    241                       1259    34030    media_library    TABLE       CREATE TABLE public.media_library (
    media_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    file_path character varying(255) NOT NULL,
    creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    vendor_id integer
);
 !   DROP TABLE public.media_library;
       public         heap    postgres    false                       1259    34029    media_library_media_id_seq    SEQUENCE     �   CREATE SEQUENCE public.media_library_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.media_library_media_id_seq;
       public          postgres    false    282            T           0    0    media_library_media_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.media_library_media_id_seq OWNED BY public.media_library.media_id;
          public          postgres    false    281                       1259    17619    messages    TABLE       CREATE TABLE public.messages (
    message_id integer NOT NULL,
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    content text NOT NULL,
    user_type text NOT NULL,
    "timestamp" timestamp with time zone
);
    DROP TABLE public.messages;
       public         heap    postgres    false                       1259    17618    messages_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.messages_message_id_seq;
       public          postgres    false    277            U           0    0    messages_message_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;
          public          postgres    false    276            �            1259    16832    mobileelectronics    TABLE     ,  CREATE TABLE public.mobileelectronics (
    product_me_id integer NOT NULL,
    ad_title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    currency_symbol character varying(10),
    category character varying(100),
    subcategory character varying(100),
    condition character varying(50),
    brand character varying(100),
    is_featured boolean DEFAULT false,
    vendorid integer,
    rejection_reason text,
    status integer DEFAULT 0,
    uniquepid character varying(50),
    category_type character varying(255),
    modelname text,
    storagetype text,
    storagecapacity text,
    displaysize text,
    connectivityports text,
    batterylife text,
    dimensions text,
    weight text,
    warrantyinformation text,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    localdeliverycharge numeric(10,2),
    zonaldeliverycharge numeric(10,2),
    nationaldeliverycharge numeric(10,2),
    weightkg numeric(10,2),
    lengthcm numeric(10,2),
    breadthcm numeric(10,2),
    heightcm numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails character varying(255),
    additionaldescription text,
    searchkeywords character varying(255),
    keyfeatures text,
    videourl character varying(255),
    salespackage character varying(255),
    isvariant text,
    quantity integer,
    processor text,
    ram text,
    graphicscard text,
    operatingsystem text,
    keyboardtype text,
    postalcode text,
    simcard text,
    unlockstatus text,
    cameraresolution text,
    inthebox text,
    images text[]
);
 %   DROP TABLE public.mobileelectronics;
       public         heap    postgres    false                       1259    17588    mobilehomebanner    TABLE       CREATE TABLE public.mobilehomebanner (
    id integer NOT NULL,
    mobilebanner_url character varying(255) DEFAULT NULL::character varying,
    title character varying(100) DEFAULT NULL::character varying,
    link character varying(255) DEFAULT NULL::character varying
);
 $   DROP TABLE public.mobilehomebanner;
       public         heap    postgres    false                       1259    17587    mobilehomebanner_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mobilehomebanner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.mobilehomebanner_id_seq;
       public          postgres    false    273            V           0    0    mobilehomebanner_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.mobilehomebanner_id_seq OWNED BY public.mobilehomebanner.id;
          public          postgres    false    272            �            1259    16841    payments    TABLE     B  CREATE TABLE public.payments (
    payment_id integer NOT NULL,
    customer_id integer NOT NULL,
    order_id integer NOT NULL,
    payment_date timestamp without time zone NOT NULL,
    payment_method character varying(255) NOT NULL,
    payment_amount numeric(10,2) NOT NULL,
    payment_status character varying(50) NOT NULL,
    billing_address text,
    billing_city character varying(100),
    billing_state character varying(100),
    billing_zip character varying(20),
    currency_code character(3),
    payment_source character varying(255),
    vendor_id integer
);
    DROP TABLE public.payments;
       public         heap    postgres    false            �            1259    16846    payments_payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payments_payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.payments_payment_id_seq;
       public          postgres    false    243            W           0    0    payments_payment_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.payments_payment_id_seq OWNED BY public.payments.payment_id;
          public          postgres    false    244            �            1259    16847 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_mobile_electronics_product_me_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.product_mobile_electronics_product_me_id_seq;
       public          postgres    false    242            X           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE OWNED BY     t   ALTER SEQUENCE public.product_mobile_electronics_product_me_id_seq OWNED BY public.mobileelectronics.product_me_id;
          public          postgres    false    245            �            1259    16848    products    TABLE     t  CREATE TABLE public.products (
    id integer NOT NULL,
    ad_title character varying(255),
    city character varying(255),
    state character varying(255),
    country character varying(255),
    currency_symbol character varying(255),
    category character varying(255),
    subcategory character varying(255),
    vendorid integer,
    uniquepid integer,
    skuid character varying(255),
    mrp numeric(10,2),
    sellingprice numeric(10,2),
    countryoforigin character varying(255),
    manufacturername character varying(255),
    packerdetails text,
    additionaldescription text,
    searchkeywords text,
    keyfeatures text,
    videourl character varying(255),
    category_type character varying(255),
    quantity integer,
    postalcode character varying(255),
    salespackage text,
    brand character varying(255),
    condition character varying(255),
    isvariant text,
    status integer DEFAULT 0,
    updated_at_product timestamp with time zone,
    rejection_reason text,
    slug_subcat text,
    slug_cat text,
    images text[],
    attributes_specification json DEFAULT '{}'::json,
    prod_slug text
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16854    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    246            Y           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    247            �            1259    16855    ratings_and_reviews    TABLE     	  CREATE TABLE public.ratings_and_reviews (
    id integer NOT NULL,
    vendor_id integer,
    customer_id integer,
    rating integer,
    review_text text,
    medias text[],
    created_at timestamp without time zone,
    product_uniqueid text,
    label text
);
 '   DROP TABLE public.ratings_and_reviews;
       public         heap    postgres    false            �            1259    16860    ratings_and_reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_and_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.ratings_and_reviews_id_seq;
       public          postgres    false    248            Z           0    0    ratings_and_reviews_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.ratings_and_reviews_id_seq OWNED BY public.ratings_and_reviews.id;
          public          postgres    false    249            �            1259    16861    social_logins    TABLE     �   CREATE TABLE public.social_logins (
    login_id integer NOT NULL,
    customer_id integer NOT NULL,
    provider character varying(50) NOT NULL,
    provider_user_id character varying(255) NOT NULL
);
 !   DROP TABLE public.social_logins;
       public         heap    postgres    false            �            1259    16864    social_logins_login_id_seq    SEQUENCE     �   CREATE SEQUENCE public.social_logins_login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.social_logins_login_id_seq;
       public          postgres    false    250            [           0    0    social_logins_login_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.social_logins_login_id_seq OWNED BY public.social_logins.login_id;
          public          postgres    false    251            �            1259    16865    subcategories    TABLE     �  CREATE TABLE public.subcategories (
    subcategory_id integer NOT NULL,
    subcategory_name character varying(255) NOT NULL,
    subcategory_description text,
    subcategory_image_url character varying(255),
    parent_category_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    isfeatured boolean
);
 !   DROP TABLE public.subcategories;
       public         heap    postgres    false            �            1259    16872     subcategories_subcategory_id_seq    SEQUENCE     �   CREATE SEQUENCE public.subcategories_subcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.subcategories_subcategory_id_seq;
       public          postgres    false    252            \           0    0     subcategories_subcategory_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.subcategories_subcategory_id_seq OWNED BY public.subcategories.subcategory_id;
          public          postgres    false    253            �            1259    16873 
   superadmin    TABLE       CREATE TABLE public.superadmin (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    "userId" character varying(255),
    role_id integer[],
    "position" character varying(255),
    name character varying(255)
);
    DROP TABLE public.superadmin;
       public         heap    postgres    false            �            1259    16878    superadmin_id_seq    SEQUENCE     �   CREATE SEQUENCE public.superadmin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.superadmin_id_seq;
       public          postgres    false    254            ]           0    0    superadmin_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.superadmin_id_seq OWNED BY public.superadmin.id;
          public          postgres    false    255                       1259    17676    transactions    TABLE     �  CREATE TABLE public.transactions (
    id integer NOT NULL,
    transaction_id text NOT NULL,
    customer_id integer NOT NULL,
    transaction_external_id character varying(255) NOT NULL,
    amount numeric(15,2) NOT NULL,
    currency_code character varying(3) NOT NULL,
    transaction_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_verified boolean DEFAULT false,
    verification_date timestamp with time zone,
    payment_method character varying(50),
    notes text,
    CONSTRAINT ck_amount CHECK ((amount > (0)::numeric)),
    CONSTRAINT ck_currency_code CHECK ((char_length((currency_code)::text) = 3)),
    CONSTRAINT ck_payment_method CHECK (((payment_method IS NULL) OR (char_length((payment_method)::text) <= 50)))
);
     DROP TABLE public.transactions;
       public         heap    postgres    false                       1259    17675    transactions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.transactions_id_seq;
       public          postgres    false    279            ^           0    0    transactions_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;
          public          postgres    false    278                       1259    17695    transactions_id_seqs    SEQUENCE     }   CREATE SEQUENCE public.transactions_id_seqs
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.transactions_id_seqs;
       public          postgres    false                        1259    16879    variantproducts    TABLE       CREATE TABLE public.variantproducts (
    variant_id integer NOT NULL,
    product_uniqueid character varying(255),
    variant_mrp numeric(10,2),
    variant_sellingprice numeric(10,2),
    variant_skuid character varying(255),
    variant_quantity integer,
    variantsvalues text,
    label text,
    vendori_id integer,
    variant_category text,
    variant_subcategory text
);
 #   DROP TABLE public.variantproducts;
       public         heap    postgres    false                       1259    16884    variantproducts_variant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variantproducts_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.variantproducts_variant_id_seq;
       public          postgres    false    256            _           0    0    variantproducts_variant_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.variantproducts_variant_id_seq OWNED BY public.variantproducts.variant_id;
          public          postgres    false    257                       1259    17517    vendorclaim    TABLE     �  CREATE TABLE public.vendorclaim (
    claim_id integer NOT NULL,
    vendor_id integer,
    claim_description text NOT NULL,
    claim_status character varying(50) DEFAULT 'Pending'::character varying,
    claim_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reply_description text,
    reply_date timestamp without time zone,
    closure_description text,
    closure_date timestamp without time zone,
    image_files jsonb,
    video_files text
);
    DROP TABLE public.vendorclaim;
       public         heap    postgres    false                       1259    17516    vendorclaim_claim_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorclaim_claim_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.vendorclaim_claim_id_seq;
       public          postgres    false    271            `           0    0    vendorclaim_claim_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.vendorclaim_claim_id_seq OWNED BY public.vendorclaim.claim_id;
          public          postgres    false    270                       1259    16885    vendorproductorder    TABLE     �  CREATE TABLE public.vendorproductorder (
    order_id integer NOT NULL,
    vendor_id integer,
    product_uniqueid integer,
    customer_id integer,
    order_date timestamp without time zone,
    total_amount numeric(10,2),
    order_status character varying(50),
    rejection_reason text,
    product_name character varying(255),
    customer_name character varying(255),
    product_image text,
    customer_email character varying(255),
    customer_phone_number character varying(20),
    created_at timestamp without time zone DEFAULT now(),
    currency_symbol character varying(10),
    payment_method character varying(50),
    payment_status character varying(50),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    brand character varying(100),
    category character varying(100),
    subcategory character varying(100),
    product_type character varying(50),
    transaction_id character varying(255) DEFAULT NULL::character varying,
    commission_fee numeric,
    withdrawal_amount numeric,
    refund_amount numeric,
    fees_paid numeric,
    tax_collected numeric,
    orderid text,
    quantity integer,
    label text,
    tentative_delivery_date text,
    skuid_order text
);
 &   DROP TABLE public.vendorproductorder;
       public         heap    postgres    false                       1259    16892    vendorproductorder_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendorproductorder_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.vendorproductorder_order_id_seq;
       public          postgres    false    258            a           0    0    vendorproductorder_order_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.vendorproductorder_order_id_seq OWNED BY public.vendorproductorder.order_id;
          public          postgres    false    259                       1259    16893    vendors    TABLE     	  CREATE TABLE public.vendors (
    id integer NOT NULL,
    country_code character varying(10) NOT NULL,
    mobile_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    brand_name character varying(255),
    business_model character varying(255),
    products jsonb,
    trademark_certificate jsonb,
    company_name character varying(255),
    company_city character varying(255),
    company_state character varying(255),
    company_country character varying(255),
    company_zip_code character varying(255),
    shipping_address character varying(255),
    bank_name character varying(255),
    bank_account_number character varying(50),
    bank_routing_number character varying(50),
    bank_account_name character varying(255),
    bank_branch character varying(255),
    bank_swift_code character varying(50),
    registration_date character varying(255),
    mobile_verification_status boolean,
    email_verification_status boolean,
    status integer DEFAULT 0,
    business_type character varying(255),
    registration_number character varying(50),
    tax_id_number character varying(255),
    business_address character varying(255),
    business_phone character varying(255),
    business_email character varying(255),
    business_website character varying(255),
    business_description character varying(255),
    facebook_url character varying(255),
    instagram_url character varying(255),
    twitter_url character varying(255),
    linkedin_url character varying(255),
    business_logo_url character varying(255),
    business_license_url character varying(255),
    return_policy text,
    shipping_policy text,
    terms_and_conditions text,
    payment_info text,
    shipping_info text,
    support_contact character varying(100),
    categories text,
    average_rating numeric(3,2),
    total_products integer,
    total_sales numeric(10,2),
    support_contact_1 character varying(255),
    support_contact_2 character varying(255),
    vendor_profile_picture_url jsonb,
    brand_logo jsonb,
    useridvendor character varying(255),
    vendorname text,
    email_otp character varying(4),
    mobile_otp character varying(4),
    reset_otp text,
    followers integer,
    following integer
);
    DROP TABLE public.vendors;
       public         heap    postgres    false                       1259    16899    vendors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.vendors_id_seq;
       public          postgres    false    260            b           0    0    vendors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.vendors_id_seq OWNED BY public.vendors.id;
          public          postgres    false    261                       1259    16900    vendors_notifications    TABLE     �   CREATE TABLE public.vendors_notifications (
    id integer NOT NULL,
    vendor_id integer NOT NULL,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    date text NOT NULL
);
 )   DROP TABLE public.vendors_notifications;
       public         heap    postgres    false                       1259    16905    vendors_notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendors_notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.vendors_notifications_id_seq;
       public          postgres    false    262            c           0    0    vendors_notifications_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.vendors_notifications_id_seq OWNED BY public.vendors_notifications.id;
          public          postgres    false    263                       1259    16906    withdrawals    TABLE       CREATE TABLE public.withdrawals (
    withdrawal_id integer NOT NULL,
    vendor_id integer NOT NULL,
    currency_code character varying(100) NOT NULL,
    amount numeric(10,2) NOT NULL,
    withdrawal_date date NOT NULL,
    status character varying(20) NOT NULL,
    bank_account_number character varying(20) NOT NULL,
    bank_name character varying(100) NOT NULL,
    bank_branch character varying(100),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.withdrawals;
       public         heap    postgres    false            	           1259    16911    withdrawals_withdrawal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.withdrawals_withdrawal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.withdrawals_withdrawal_id_seq;
       public          postgres    false    264            d           0    0    withdrawals_withdrawal_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.withdrawals_withdrawal_id_seq OWNED BY public.withdrawals.withdrawal_id;
          public          postgres    false    265            �           2604    25864    attributes attribute_id    DEFAULT     �   ALTER TABLE ONLY public.attributes ALTER COLUMN attribute_id SET DEFAULT nextval('public.attributes_attribute_id_seq'::regclass);
 F   ALTER TABLE public.attributes ALTER COLUMN attribute_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    25865    audioheadphones product_ah_id    DEFAULT     �   ALTER TABLE ONLY public.audioheadphones ALTER COLUMN product_ah_id SET DEFAULT nextval('public.audio_headphones_product_ah_id_seq'::regclass);
 L   ALTER TABLE public.audioheadphones ALTER COLUMN product_ah_id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    25866    cameraphotography product_cp_id    DEFAULT     �   ALTER TABLE ONLY public.cameraphotography ALTER COLUMN product_cp_id SET DEFAULT nextval('public.camera_photography_product_cp_id_seq'::regclass);
 N   ALTER TABLE public.cameraphotography ALTER COLUMN product_cp_id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    25867    cart cart_id    DEFAULT     l   ALTER TABLE ONLY public.cart ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 ;   ALTER TABLE public.cart ALTER COLUMN cart_id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    25868    categories category_id    DEFAULT     �   ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);
 E   ALTER TABLE public.categories ALTER COLUMN category_id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    25869    clothing product_fac_id    DEFAULT     �   ALTER TABLE ONLY public.clothing ALTER COLUMN product_fac_id SET DEFAULT nextval('public.fashionclothing_product_fac_id_seq'::regclass);
 F   ALTER TABLE public.clothing ALTER COLUMN product_fac_id DROP DEFAULT;
       public          postgres    false    239    226                       2604    25870    conversations conversation_id    DEFAULT     �   ALTER TABLE ONLY public.conversations ALTER COLUMN conversation_id SET DEFAULT nextval('public.conversations_conversation_id_seq'::regclass);
 L   ALTER TABLE public.conversations ALTER COLUMN conversation_id DROP DEFAULT;
       public          postgres    false    275    274    275            �           2604    25871    coupons coupon_id    DEFAULT     v   ALTER TABLE ONLY public.coupons ALTER COLUMN coupon_id SET DEFAULT nextval('public.coupons_coupon_id_seq'::regclass);
 @   ALTER TABLE public.coupons ALTER COLUMN coupon_id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    25872    currency_values id    DEFAULT     x   ALTER TABLE ONLY public.currency_values ALTER COLUMN id SET DEFAULT nextval('public.currency_values_id_seq'::regclass);
 A   ALTER TABLE public.currency_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    25873    customer_address address_id    DEFAULT     �   ALTER TABLE ONLY public.customer_address ALTER COLUMN address_id SET DEFAULT nextval('public.customer_address_address_id_seq'::regclass);
 J   ALTER TABLE public.customer_address ALTER COLUMN address_id DROP DEFAULT;
       public          postgres    false    268    269    269            �           2604    25874    customer_delivery_address id    DEFAULT     �   ALTER TABLE ONLY public.customer_delivery_address ALTER COLUMN id SET DEFAULT nextval('public.customer_delivery_address_id_seq'::regclass);
 K   ALTER TABLE public.customer_delivery_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231            �           2604    25875    customer_follows follow_id    DEFAULT     �   ALTER TABLE ONLY public.customer_follows ALTER COLUMN follow_id SET DEFAULT nextval('public.customer_follows_follow_id_seq'::regclass);
 I   ALTER TABLE public.customer_follows ALTER COLUMN follow_id DROP DEFAULT;
       public          postgres    false    234    233            �           2604    25876    customer_wishlist wishlist_id    DEFAULT     �   ALTER TABLE ONLY public.customer_wishlist ALTER COLUMN wishlist_id SET DEFAULT nextval('public.customer_wishlist_wishlist_id_seq'::regclass);
 L   ALTER TABLE public.customer_wishlist ALTER COLUMN wishlist_id DROP DEFAULT;
       public          postgres    false    236    235            �           2604    25877    customers customer_id    DEFAULT     ~   ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);
 D   ALTER TABLE public.customers ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    238    237            �           2604    25878    homebanner id    DEFAULT     r   ALTER TABLE ONLY public.homebanner ALTER COLUMN id SET DEFAULT nextval('public.homebanner_new_id_seq'::regclass);
 <   ALTER TABLE public.homebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    266    267    267            �           2604    25879    laptopcomputers product_lc_id    DEFAULT     �   ALTER TABLE ONLY public.laptopcomputers ALTER COLUMN product_lc_id SET DEFAULT nextval('public.laptopcomputers_product_lc_id_seq'::regclass);
 L   ALTER TABLE public.laptopcomputers ALTER COLUMN product_lc_id DROP DEFAULT;
       public          postgres    false    241    240            
           2604    34033    media_library media_id    DEFAULT     �   ALTER TABLE ONLY public.media_library ALTER COLUMN media_id SET DEFAULT nextval('public.media_library_media_id_seq'::regclass);
 E   ALTER TABLE public.media_library ALTER COLUMN media_id DROP DEFAULT;
       public          postgres    false    281    282    282                       2604    25880    messages message_id    DEFAULT     z   ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);
 B   ALTER TABLE public.messages ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    277    276    277            �           2604    25881    mobileelectronics product_me_id    DEFAULT     �   ALTER TABLE ONLY public.mobileelectronics ALTER COLUMN product_me_id SET DEFAULT nextval('public.product_mobile_electronics_product_me_id_seq'::regclass);
 N   ALTER TABLE public.mobileelectronics ALTER COLUMN product_me_id DROP DEFAULT;
       public          postgres    false    245    242                       2604    25882    mobilehomebanner id    DEFAULT     z   ALTER TABLE ONLY public.mobilehomebanner ALTER COLUMN id SET DEFAULT nextval('public.mobilehomebanner_id_seq'::regclass);
 B   ALTER TABLE public.mobilehomebanner ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    272    273    273            �           2604    25883    payments payment_id    DEFAULT     z   ALTER TABLE ONLY public.payments ALTER COLUMN payment_id SET DEFAULT nextval('public.payments_payment_id_seq'::regclass);
 B   ALTER TABLE public.payments ALTER COLUMN payment_id DROP DEFAULT;
       public          postgres    false    244    243            �           2604    25884    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    247    246            �           2604    25885    ratings_and_reviews id    DEFAULT     �   ALTER TABLE ONLY public.ratings_and_reviews ALTER COLUMN id SET DEFAULT nextval('public.ratings_and_reviews_id_seq'::regclass);
 E   ALTER TABLE public.ratings_and_reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    249    248            �           2604    25886    social_logins login_id    DEFAULT     �   ALTER TABLE ONLY public.social_logins ALTER COLUMN login_id SET DEFAULT nextval('public.social_logins_login_id_seq'::regclass);
 E   ALTER TABLE public.social_logins ALTER COLUMN login_id DROP DEFAULT;
       public          postgres    false    251    250            �           2604    25887    subcategories subcategory_id    DEFAULT     �   ALTER TABLE ONLY public.subcategories ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategories_subcategory_id_seq'::regclass);
 K   ALTER TABLE public.subcategories ALTER COLUMN subcategory_id DROP DEFAULT;
       public          postgres    false    253    252            �           2604    25888    superadmin id    DEFAULT     n   ALTER TABLE ONLY public.superadmin ALTER COLUMN id SET DEFAULT nextval('public.superadmin_id_seq'::regclass);
 <   ALTER TABLE public.superadmin ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    255    254                       2604    25889    transactions id    DEFAULT     r   ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);
 >   ALTER TABLE public.transactions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    278    279    279            �           2604    25890    variantproducts variant_id    DEFAULT     �   ALTER TABLE ONLY public.variantproducts ALTER COLUMN variant_id SET DEFAULT nextval('public.variantproducts_variant_id_seq'::regclass);
 I   ALTER TABLE public.variantproducts ALTER COLUMN variant_id DROP DEFAULT;
       public          postgres    false    257    256            �           2604    25891    vendorclaim claim_id    DEFAULT     |   ALTER TABLE ONLY public.vendorclaim ALTER COLUMN claim_id SET DEFAULT nextval('public.vendorclaim_claim_id_seq'::regclass);
 C   ALTER TABLE public.vendorclaim ALTER COLUMN claim_id DROP DEFAULT;
       public          postgres    false    271    270    271            �           2604    25892    vendorproductorder order_id    DEFAULT     �   ALTER TABLE ONLY public.vendorproductorder ALTER COLUMN order_id SET DEFAULT nextval('public.vendorproductorder_order_id_seq'::regclass);
 J   ALTER TABLE public.vendorproductorder ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    259    258            �           2604    25893 
   vendors id    DEFAULT     h   ALTER TABLE ONLY public.vendors ALTER COLUMN id SET DEFAULT nextval('public.vendors_id_seq'::regclass);
 9   ALTER TABLE public.vendors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    261    260            �           2604    25894    vendors_notifications id    DEFAULT     �   ALTER TABLE ONLY public.vendors_notifications ALTER COLUMN id SET DEFAULT nextval('public.vendors_notifications_id_seq'::regclass);
 G   ALTER TABLE public.vendors_notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    263    262            �           2604    25895    withdrawals withdrawal_id    DEFAULT     �   ALTER TABLE ONLY public.withdrawals ALTER COLUMN withdrawal_id SET DEFAULT nextval('public.withdrawals_withdrawal_id_seq'::regclass);
 H   ALTER TABLE public.withdrawals ALTER COLUMN withdrawal_id DROP DEFAULT;
       public          postgres    false    265    264            �          0    16731 
   attributes 
   TABLE DATA           k   COPY public.attributes (attribute_id, attribute_name, attribute_values, category, subcategory) FROM stdin;
    public          postgres    false    216   ^�      �          0    16737    audioheadphones 
   TABLE DATA           r  COPY public.audioheadphones (product_ah_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, rejection_reason, status, updated_at_product, uniquepid, category_type, subcategory, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, driversize, impedance, frequencyrange, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    218   ��      �          0    16748    cameraphotography 
   TABLE DATA           �  COPY public.cameraphotography (product_cp_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, modelname, storagetype, storagecapacity, displaysize, screenresolution, connectivityports, batterylife, dimensions, weight, warrantyinformation, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    220   ��                 0    16759    cart 
   TABLE DATA           �   COPY public.cart (cart_id, customer_id, vendor_id, product_uniqueid, category, subcategory, quantity, addeddate, updateddate, variantlabel, mrp, sellingprice) FROM stdin;
    public          postgres    false    222   ��                0    16767 
   categories 
   TABLE DATA           �   COPY public.categories (category_id, category_name, category_description, category_image_url, category_status, created_at, updated_at, category_type) FROM stdin;
    public          postgres    false    224   �                0    16776    clothing 
   TABLE DATA           q  COPY public.clothing (product_fac_id, ad_title, additionaldescription, countryoforigin, manufacturername, packerdetails, searchkeywords, keyfeatures, videourl, salespackage, city, state, mrp, sellingprice, quantity, inthebox, isvariant, status, category_type, currency_symbol, uniquepid, vendorid, postalcode, country, category, subcategory, skuid, images) FROM stdin;
    public          postgres    false    226   "�      5          0    17600    conversations 
   TABLE DATA           h   COPY public.conversations (conversation_id, customer_id, vendor_id, conversation_user_type) FROM stdin;
    public          postgres    false    275   �                0    16782    coupons 
   TABLE DATA           �   COPY public.coupons (coupon_id, coupon_code, discount_type, discount_amount, expiration_date, vendorid, associated_products, created_date) FROM stdin;
    public          postgres    false    227   �                0    16788    currency_values 
   TABLE DATA           K   COPY public.currency_values (id, usd, kes, eur, etb, sos, inr) FROM stdin;
    public          postgres    false    229   �      /          0    17057    customer_address 
   TABLE DATA             COPY public.customer_address (address_id, customer_id, given_name_address, family_name_address, email_address, phone_address, country_address, zip_address, city_address, subregion_address, region_address, note_address, default_address, apt_address, phone_code) FROM stdin;
    public          postgres    false    269   #�      	          0    16794    customer_delivery_address 
   TABLE DATA           �   COPY public.customer_delivery_address (id, customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id) FROM stdin;
    public          postgres    false    231   �                0    16800    customer_follows 
   TABLE DATA           ]   COPY public.customer_follows (follow_id, follower_id, following_id, follow_date) FROM stdin;
    public          postgres    false    233   �                0    16805    customer_wishlist 
   TABLE DATA           �   COPY public.customer_wishlist (wishlist_id, customer_id, uniqueid, label, category, subcategory, vendor_id, mrp, sellingprice, created_on) FROM stdin;
    public          postgres    false    235   �                0    16811 	   customers 
   TABLE DATA           P  COPY public.customers (customer_id, given_name, family_name, email, password, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, verified_with, created_at, updated_at, status, picture, google_id, facebook_id, verification_code, verification_expire_date, customer_loggedid, customer_interest) FROM stdin;
    public          postgres    false    237   �      -          0    17047 
   homebanner 
   TABLE DATA           A   COPY public.homebanner (id, banner_url, title, link) FROM stdin;
    public          postgres    false    267   а                0    16821    laptopcomputers 
   TABLE DATA           #  COPY public.laptopcomputers (product_lc_id, ad_title, currency_symbol, city, state, country, brand, category, vendorid, is_featured, is_sold, is_negotiable, created_at, subcategory, rejection_reason, status, updated_at_product, uniquepid, category_type, condition, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, salespackage, keyfeatures, videourl, modelname, processor, ram, storagetype, storagecapacity, displaysize, screenresolution, graphicscard, operatingsystem, connectivityports, batterylife, keyboardtype, touchpad, dimensions, weight, warrantyinformation, isvariant, quantity, postalcode, inthebox, images) FROM stdin;
    public          postgres    false    240   �      <          0    34030    media_library 
   TABLE DATA           j   COPY public.media_library (media_id, title, description, file_path, creation_date, vendor_id) FROM stdin;
    public          postgres    false    282   {�      7          0    17619    messages 
   TABLE DATA           y   COPY public.messages (message_id, conversation_id, sender_id, recipient_id, content, user_type, "timestamp") FROM stdin;
    public          postgres    false    277   ��                0    16832    mobileelectronics 
   TABLE DATA             COPY public.mobileelectronics (product_me_id, ad_title, created_at, updated_at, city, state, country, currency_symbol, category, subcategory, condition, brand, is_featured, vendorid, rejection_reason, status, uniquepid, category_type, modelname, storagetype, storagecapacity, displaysize, connectivityports, batterylife, dimensions, weight, warrantyinformation, skuid, mrp, sellingprice, localdeliverycharge, zonaldeliverycharge, nationaldeliverycharge, weightkg, lengthcm, breadthcm, heightcm, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, salespackage, isvariant, quantity, processor, ram, graphicscard, operatingsystem, keyboardtype, postalcode, simcard, unlockstatus, cameraresolution, inthebox, images) FROM stdin;
    public          postgres    false    242   1�      3          0    17588    mobilehomebanner 
   TABLE DATA           M   COPY public.mobilehomebanner (id, mobilebanner_url, title, link) FROM stdin;
    public          postgres    false    273   ��                0    16841    payments 
   TABLE DATA           �   COPY public.payments (payment_id, customer_id, order_id, payment_date, payment_method, payment_amount, payment_status, billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id) FROM stdin;
    public          postgres    false    243   �                0    16848    products 
   TABLE DATA           �  COPY public.products (id, ad_title, city, state, country, currency_symbol, category, subcategory, vendorid, uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails, additionaldescription, searchkeywords, keyfeatures, videourl, category_type, quantity, postalcode, salespackage, brand, condition, isvariant, status, updated_at_product, rejection_reason, slug_subcat, slug_cat, images, attributes_specification, prod_slug) FROM stdin;
    public          postgres    false    246   4�                0    16855    ratings_and_reviews 
   TABLE DATA           �   COPY public.ratings_and_reviews (id, vendor_id, customer_id, rating, review_text, medias, created_at, product_uniqueid, label) FROM stdin;
    public          postgres    false    248   }�                0    16861    social_logins 
   TABLE DATA           Z   COPY public.social_logins (login_id, customer_id, provider, provider_user_id) FROM stdin;
    public          postgres    false    250   ��                0    16865    subcategories 
   TABLE DATA           �   COPY public.subcategories (subcategory_id, subcategory_name, subcategory_description, subcategory_image_url, parent_category_id, created_at, updated_at, isfeatured) FROM stdin;
    public          postgres    false    252   ��                 0    16873 
   superadmin 
   TABLE DATA           ^   COPY public.superadmin (id, email, password, "userId", role_id, "position", name) FROM stdin;
    public          postgres    false    254   %�      9          0    17676    transactions 
   TABLE DATA           �   COPY public.transactions (id, transaction_id, customer_id, transaction_external_id, amount, currency_code, transaction_date, is_verified, verification_date, payment_method, notes) FROM stdin;
    public          postgres    false    279   ��      "          0    16879    variantproducts 
   TABLE DATA           �   COPY public.variantproducts (variant_id, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, vendori_id, variant_category, variant_subcategory) FROM stdin;
    public          postgres    false    256   -�      1          0    17517    vendorclaim 
   TABLE DATA           �   COPY public.vendorclaim (claim_id, vendor_id, claim_description, claim_status, claim_date, reply_description, reply_date, closure_description, closure_date, image_files, video_files) FROM stdin;
    public          postgres    false    271   �      $          0    16885    vendorproductorder 
   TABLE DATA             COPY public.vendorproductorder (order_id, vendor_id, product_uniqueid, customer_id, order_date, total_amount, order_status, rejection_reason, product_name, customer_name, product_image, customer_email, customer_phone_number, created_at, currency_symbol, payment_method, payment_status, city, state, country, brand, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, orderid, quantity, label, tentative_delivery_date, skuid_order) FROM stdin;
    public          postgres    false    258   �      &          0    16893    vendors 
   TABLE DATA           �  COPY public.vendors (id, country_code, mobile_number, email, password, brand_name, business_model, products, trademark_certificate, company_name, company_city, company_state, company_country, company_zip_code, shipping_address, bank_name, bank_account_number, bank_routing_number, bank_account_name, bank_branch, bank_swift_code, registration_date, mobile_verification_status, email_verification_status, status, business_type, registration_number, tax_id_number, business_address, business_phone, business_email, business_website, business_description, facebook_url, instagram_url, twitter_url, linkedin_url, business_logo_url, business_license_url, return_policy, shipping_policy, terms_and_conditions, payment_info, shipping_info, support_contact, categories, average_rating, total_products, total_sales, support_contact_1, support_contact_2, vendor_profile_picture_url, brand_logo, useridvendor, vendorname, email_otp, mobile_otp, reset_otp, followers, following) FROM stdin;
    public          postgres    false    260   �      (          0    16900    vendors_notifications 
   TABLE DATA           Z   COPY public.vendors_notifications (id, vendor_id, type, title, message, date) FROM stdin;
    public          postgres    false    262   T      *          0    16906    withdrawals 
   TABLE DATA           �   COPY public.withdrawals (withdrawal_id, vendor_id, currency_code, amount, withdrawal_date, status, bank_account_number, bank_name, bank_branch, created_at, updated_at) FROM stdin;
    public          postgres    false    264   c	      e           0    0    attributes_attribute_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.attributes_attribute_id_seq', 16, true);
          public          postgres    false    217            f           0    0 "   audio_headphones_product_ah_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.audio_headphones_product_ah_id_seq', 45, true);
          public          postgres    false    219            g           0    0 $   camera_photography_product_cp_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.camera_photography_product_cp_id_seq', 41, true);
          public          postgres    false    221            h           0    0    cart_cart_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.cart_cart_id_seq', 635, true);
          public          postgres    false    223            i           0    0    categories_category_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categories_category_id_seq', 63, true);
          public          postgres    false    225            j           0    0 !   conversations_conversation_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.conversations_conversation_id_seq', 3, true);
          public          postgres    false    274            k           0    0    coupons_coupon_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.coupons_coupon_id_seq', 8, true);
          public          postgres    false    228            l           0    0    currency_values_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.currency_values_id_seq', 1, true);
          public          postgres    false    230            m           0    0    customer_address_address_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.customer_address_address_id_seq', 31, true);
          public          postgres    false    268            n           0    0     customer_delivery_address_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_delivery_address_id_seq', 152, true);
          public          postgres    false    232            o           0    0    customer_follows_follow_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.customer_follows_follow_id_seq', 19, true);
          public          postgres    false    234            p           0    0 !   customer_wishlist_wishlist_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.customer_wishlist_wishlist_id_seq', 95, true);
          public          postgres    false    236            q           0    0    customers_customer_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.customers_customer_id_seq', 176, true);
          public          postgres    false    238            r           0    0 "   fashionclothing_product_fac_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.fashionclothing_product_fac_id_seq', 8, true);
          public          postgres    false    239            s           0    0    homebanner_new_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.homebanner_new_id_seq', 10, true);
          public          postgres    false    266            t           0    0 !   laptopcomputers_product_lc_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.laptopcomputers_product_lc_id_seq', 121, true);
          public          postgres    false    241            u           0    0    media_library_media_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.media_library_media_id_seq', 21, true);
          public          postgres    false    281            v           0    0    messages_message_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.messages_message_id_seq', 158, true);
          public          postgres    false    276            w           0    0    mobilehomebanner_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.mobilehomebanner_id_seq', 10, true);
          public          postgres    false    272            x           0    0    payments_payment_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.payments_payment_id_seq', 69, true);
          public          postgres    false    244            y           0    0 ,   product_mobile_electronics_product_me_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.product_mobile_electronics_product_me_id_seq', 365, true);
          public          postgres    false    245            z           0    0    products_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.products_id_seq', 1008, true);
          public          postgres    false    247            {           0    0    ratings_and_reviews_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.ratings_and_reviews_id_seq', 116, true);
          public          postgres    false    249            |           0    0    social_logins_login_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.social_logins_login_id_seq', 1, false);
          public          postgres    false    251            }           0    0     subcategories_subcategory_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.subcategories_subcategory_id_seq', 183, true);
          public          postgres    false    253            ~           0    0    superadmin_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.superadmin_id_seq', 22, true);
          public          postgres    false    255                       0    0    transactions_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.transactions_id_seq', 15, true);
          public          postgres    false    278            �           0    0    transactions_id_seqs    SEQUENCE SET     C   SELECT pg_catalog.setval('public.transactions_id_seqs', 15, true);
          public          postgres    false    280            �           0    0    variantproducts_variant_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.variantproducts_variant_id_seq', 91, true);
          public          postgres    false    257            �           0    0    vendorclaim_claim_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.vendorclaim_claim_id_seq', 17, true);
          public          postgres    false    270            �           0    0    vendorproductorder_order_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vendorproductorder_order_id_seq', 175, true);
          public          postgres    false    259            �           0    0    vendors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.vendors_id_seq', 67, true);
          public          postgres    false    261            �           0    0    vendors_notifications_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.vendors_notifications_id_seq', 39, true);
          public          postgres    false    263            �           0    0    withdrawals_withdrawal_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.withdrawals_withdrawal_id_seq', 6, true);
          public          postgres    false    265                       2606    16938    attributes attributes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (attribute_id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    216                       2606    16940 %   audioheadphones audio_headphones_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.audioheadphones
    ADD CONSTRAINT audio_headphones_pkey PRIMARY KEY (product_ah_id);
 O   ALTER TABLE ONLY public.audioheadphones DROP CONSTRAINT audio_headphones_pkey;
       public            postgres    false    218                       2606    16942 )   cameraphotography camera_photography_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.cameraphotography
    ADD CONSTRAINT camera_photography_pkey PRIMARY KEY (product_cp_id);
 S   ALTER TABLE ONLY public.cameraphotography DROP CONSTRAINT camera_photography_pkey;
       public            postgres    false    220                       2606    16944    cart cart_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    222                       2606    16946    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    224            U           2606    17607 5   conversations conversations_customer_id_vendor_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_vendor_id_key UNIQUE (customer_id, vendor_id);
 _   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_vendor_id_key;
       public            postgres    false    275    275            W           2606    17605     conversations conversations_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_pkey PRIMARY KEY (conversation_id);
 J   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_pkey;
       public            postgres    false    275                       2606    16948    coupons coupons_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.coupons
    ADD CONSTRAINT coupons_pkey PRIMARY KEY (coupon_id);
 >   ALTER TABLE ONLY public.coupons DROP CONSTRAINT coupons_pkey;
       public            postgres    false    227                       2606    16950 $   currency_values currency_values_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.currency_values
    ADD CONSTRAINT currency_values_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.currency_values DROP CONSTRAINT currency_values_pkey;
       public            postgres    false    229            O           2606    17064 &   customer_address customer_address_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (address_id);
 P   ALTER TABLE ONLY public.customer_address DROP CONSTRAINT customer_address_pkey;
       public            postgres    false    269                        2606    16952 8   customer_delivery_address customer_delivery_address_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.customer_delivery_address
    ADD CONSTRAINT customer_delivery_address_pkey PRIMARY KEY (id);
 b   ALTER TABLE ONLY public.customer_delivery_address DROP CONSTRAINT customer_delivery_address_pkey;
       public            postgres    false    231            "           2606    16954 &   customer_follows customer_follows_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_pkey PRIMARY KEY (follow_id);
 P   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_pkey;
       public            postgres    false    233            $           2606    16956 (   customer_wishlist customer_wishlist_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_pkey PRIMARY KEY (wishlist_id);
 R   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_pkey;
       public            postgres    false    235            '           2606    16958    customers customers_email_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_email_key;
       public            postgres    false    237            )           2606    16960    customers customers_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    237                       2606    16962    clothing fashionclothing_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.clothing
    ADD CONSTRAINT fashionclothing_pkey PRIMARY KEY (product_fac_id);
 G   ALTER TABLE ONLY public.clothing DROP CONSTRAINT fashionclothing_pkey;
       public            postgres    false    226            M           2606    17054    homebanner homebanner_new_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.homebanner
    ADD CONSTRAINT homebanner_new_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.homebanner DROP CONSTRAINT homebanner_new_pkey;
       public            postgres    false    267            +           2606    16964 $   laptopcomputers laptopcomputers_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.laptopcomputers
    ADD CONSTRAINT laptopcomputers_pkey PRIMARY KEY (product_lc_id);
 N   ALTER TABLE ONLY public.laptopcomputers DROP CONSTRAINT laptopcomputers_pkey;
       public            postgres    false    240            ^           2606    34038     media_library media_library_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.media_library
    ADD CONSTRAINT media_library_pkey PRIMARY KEY (media_id);
 J   ALTER TABLE ONLY public.media_library DROP CONSTRAINT media_library_pkey;
       public            postgres    false    282            Y           2606    17627    messages messages_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    277            S           2606    17598 &   mobilehomebanner mobilehomebanner_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mobilehomebanner
    ADD CONSTRAINT mobilehomebanner_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.mobilehomebanner DROP CONSTRAINT mobilehomebanner_pkey;
       public            postgres    false    273            /           2606    16966    payments payments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);
 @   ALTER TABLE ONLY public.payments DROP CONSTRAINT payments_pkey;
       public            postgres    false    243            -           2606    16968 1   mobileelectronics product_mobile_electronics_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.mobileelectronics
    ADD CONSTRAINT product_mobile_electronics_pkey PRIMARY KEY (product_me_id);
 [   ALTER TABLE ONLY public.mobileelectronics DROP CONSTRAINT product_mobile_electronics_pkey;
       public            postgres    false    242            1           2606    16970    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    246            7           2606    16972 ,   ratings_and_reviews ratings_and_reviews_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.ratings_and_reviews
    ADD CONSTRAINT ratings_and_reviews_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.ratings_and_reviews DROP CONSTRAINT ratings_and_reviews_pkey;
       public            postgres    false    248            9           2606    16974 4   social_logins social_logins_customer_id_provider_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_provider_key UNIQUE (customer_id, provider);
 ^   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_provider_key;
       public            postgres    false    250    250            ;           2606    16976     social_logins social_logins_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_pkey PRIMARY KEY (login_id);
 J   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_pkey;
       public            postgres    false    250            =           2606    16978     subcategories subcategories_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (subcategory_id);
 J   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_pkey;
       public            postgres    false    252            ?           2606    16980    superadmin superadmin_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_email_key;
       public            postgres    false    254            A           2606    16982    superadmin superadmin_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.superadmin
    ADD CONSTRAINT superadmin_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.superadmin DROP CONSTRAINT superadmin_pkey;
       public            postgres    false    254            \           2606    17688    transactions transactions_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.transactions DROP CONSTRAINT transactions_pkey;
       public            postgres    false    279            3           2606    34053    products unique_skuid_vendorid 
   CONSTRAINT     d   ALTER TABLE ONLY public.products
    ADD CONSTRAINT unique_skuid_vendorid UNIQUE (skuid, vendorid);
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT unique_skuid_vendorid;
       public            postgres    false    246    246            C           2606    16984 $   variantproducts variantproducts_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.variantproducts
    ADD CONSTRAINT variantproducts_pkey PRIMARY KEY (variant_id);
 N   ALTER TABLE ONLY public.variantproducts DROP CONSTRAINT variantproducts_pkey;
       public            postgres    false    256            Q           2606    17526    vendorclaim vendorclaim_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_pkey PRIMARY KEY (claim_id);
 F   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_pkey;
       public            postgres    false    271            E           2606    16986 *   vendorproductorder vendorproductorder_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendorproductorder
    ADD CONSTRAINT vendorproductorder_pkey PRIMARY KEY (order_id);
 T   ALTER TABLE ONLY public.vendorproductorder DROP CONSTRAINT vendorproductorder_pkey;
       public            postgres    false    258            I           2606    16988 0   vendors_notifications vendors_notifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.vendors_notifications
    ADD CONSTRAINT vendors_notifications_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.vendors_notifications DROP CONSTRAINT vendors_notifications_pkey;
       public            postgres    false    262            G           2606    16990    vendors vendors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.vendors DROP CONSTRAINT vendors_pkey;
       public            postgres    false    260            K           2606    16992    withdrawals withdrawals_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (withdrawal_id);
 F   ALTER TABLE ONLY public.withdrawals DROP CONSTRAINT withdrawals_pkey;
       public            postgres    false    264            4           1259    16993    idx_customer_id    INDEX     V   CREATE INDEX idx_customer_id ON public.ratings_and_reviews USING btree (customer_id);
 #   DROP INDEX public.idx_customer_id;
       public            postgres    false    248            %           1259    16994 !   idx_customer_wishlist_customer_id    INDEX     f   CREATE INDEX idx_customer_wishlist_customer_id ON public.customer_wishlist USING btree (customer_id);
 5   DROP INDEX public.idx_customer_wishlist_customer_id;
       public            postgres    false    235            Z           1259    17694    idx_transaction_external_id    INDEX     g   CREATE INDEX idx_transaction_external_id ON public.transactions USING btree (transaction_external_id);
 /   DROP INDEX public.idx_transaction_external_id;
       public            postgres    false    279            5           1259    16995    idx_vendor_id    INDEX     R   CREATE INDEX idx_vendor_id ON public.ratings_and_reviews USING btree (vendor_id);
 !   DROP INDEX public.idx_vendor_id;
       public            postgres    false    248            _           2606    17001    cart cart_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 D   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_customer_id_fkey;
       public          postgres    false    4905    237    222            `           2606    17006    cart cart_vendor_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_vendor_id_fkey;
       public          postgres    false    4935    222    260            g           2606    17608 ,   conversations conversations_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_customer_id_fkey;
       public          postgres    false    237    275    4905            h           2606    17613 *   conversations conversations_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT conversations_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 T   ALTER TABLE ONLY public.conversations DROP CONSTRAINT conversations_vendor_id_fkey;
       public          postgres    false    275    4935    260            a           2606    17011 2   customer_follows customer_follows_follower_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_follower_id_fkey;
       public          postgres    false    237    233    4905            b           2606    17016 3   customer_follows customer_follows_following_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_follows
    ADD CONSTRAINT customer_follows_following_id_fkey FOREIGN KEY (follower_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.customer_follows DROP CONSTRAINT customer_follows_following_id_fkey;
       public          postgres    false    233    237    4905            c           2606    17021 4   customer_wishlist customer_wishlist_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_wishlist
    ADD CONSTRAINT customer_wishlist_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 ^   ALTER TABLE ONLY public.customer_wishlist DROP CONSTRAINT customer_wishlist_customer_id_fkey;
       public          postgres    false    235    237    4905            j           2606    17689    transactions fk_customer    FK CONSTRAINT     �   ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_customer;
       public          postgres    false    237    279    4905            i           2606    17628 &   messages messages_conversation_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(conversation_id);
 P   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_conversation_id_fkey;
       public          postgres    false    4951    277    275            d           2606    17026 ,   social_logins social_logins_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.social_logins
    ADD CONSTRAINT social_logins_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);
 V   ALTER TABLE ONLY public.social_logins DROP CONSTRAINT social_logins_customer_id_fkey;
       public          postgres    false    237    4905    250            e           2606    17031 3   subcategories subcategories_parent_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.subcategories DROP CONSTRAINT subcategories_parent_category_id_fkey;
       public          postgres    false    4888    224    252            f           2606    17527 &   vendorclaim vendorclaim_vendor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.vendorclaim
    ADD CONSTRAINT vendorclaim_vendor_id_fkey FOREIGN KEY (vendor_id) REFERENCES public.vendors(id);
 P   ALTER TABLE ONLY public.vendorclaim DROP CONSTRAINT vendorclaim_vendor_id_fkey;
       public          postgres    false    4935    271    260            �   3   x�34�άJ嬎��	�����M�+v��/���K�r=2���b���� ��t      �   �  x��UMo�@=/�bO=�����R���Ur�S]j��q�FQ�{gY'nWJ*U�.�<�7o��nV69�6}G.�ə-����fmɧ6+-�v�y���ͺk�yO�!?��3.B`! �"e"�Akɝ'6�2I��R�4F '\��˺ˮ曞���ʎ��s�-���{J��yF ]��"�p3��yo��3�%�����.�ki~��'v�	���>�	�!�?�rO8_8е�ȴ�\"{�d�i��@
���'��P��)�X*x�t$�Q�3��f�+�<sx�6o�+Xv|��	س�?>�zQ/*RW�=�ٺ���Q��]��ݠ�ᛕv7ނN�J����^ۍ]C�l��H<"��o��8D8���!GD;�.fHW�R��T����1���	�X�:�'ru�o�'��Nht'�@�z\��G!�A�C��ն(�bU^䑸���*Ǔ��:�w%x�����k>/�t{:�c E�5��`"-���D�s����#��]����ϳ�=(}#̨|����U��K״��H^�Sq�BIlֻV�Lq�*�9J$�[�] %i���M�6+����1�S�BDB0	��H��Ib���!��+R0\7�f4~?�f�eyN4��?]=���sa[:-lfg/e@J��E��X�{m(4��L��9`V8�]G�'h����jo/j49�p�O�0(#Q�$���C�-�L��ly\DA�fc      �   #  x��QMO�0=���'n�b7���!!�4q��k
ݒ�SS�⿓��I�ʓ��؎�"��l�qy���Gv�42�Z��@^�����nZT��a��,AL���j�l(OKIuU�%ﺑ�x���<�}D0�SE,�A���;PD���������Gb�@9�����Jv�`��̨p�����W�B�\I6ڧ��!N���Y���s��$ŉ8�J�:HA<'���m�q����o�[�����j{t�[���
�P��E]c�K��2On���à��n���ViE����^             x����j�0����DhW?��BsjӃ/=�⺂��(H.�o_)M���H#�f֒l-Ph��
�}>����sLc�Нb�$Im��h6�^�7V�n�5�x '���r4��Z�ҰG)ؠ+�W�{�t�RU&�&bx��0�x���m���e�����(��e�;�`�[�_�JC�+UYk�!Ə���\���q���7�O�/� ���NO,�����U#pM@u6��V�Z�L�]b�����cʷ��r�S��1�_�O����Ԟ�p�)�k�� ��ՋP5�Q4M�º�         &  x����n�H������3s�F�n^'��� 10� -�m"�(����TSK3�IQ�N���UյXt����%ՈS.0u����	���4~��o���S_](��)���29�
��&�_|Qn?.�_a����k(�8��iz0ǥ_��W����'Y�[.j'Jk�TvH�\}�ټ~M��,��륯�ӌ�[)޹����]��u*�`�r>$E^���U>��q�>8���\)�6ǿI�͢���%�~�o|�=�V����Χ�rcLS���#�p�۪(�P�����(�^@c�4��T��a$��pC���w��-})��zZW������e�̧z�ۤ~ͫ>U��I��I�T��d�i���X~_��;&���Ws�MҼ�	g�)��"�B���*����t�(i%���O��`?Lf1e	3!&�E�J���>�^!F��)��*ʼ� �3Bs��N��ө�ov"$�P����h�'���O�
m�S�X��J�D��Dk��H�@��?�<<��G�RȬr���G�#�Q��t������e�wV����pX��3�$aZ9��-m)2��4�L�}����T�R%�a����|4�2�j�"�E�Ŷjb�� �0��M���0�}A�uRt�X[:I����G��Y�bP)�\�Z
�,x����1�N8�%Pg���H�v�,dfR@�e�J%w3,�qo?�L1b��I����Q}�r����3���O�	��Q�h���R��j]����O��1G��4L�)ӻ�H�F���i��7��'N0ũ��LG�pG�0\��ȣ���gh��ا�E�~�Z͇z�TB��w4���m4��R#i�M����UY�M1;C�4B�0� l{��S�-aI�"��E|�~xN*�c�1N��#�|N��slK�ɶ�QCR��Cyk';g�8�0U_膤H�v��*TO������e4�%(a�BIG.E��&S���˪.װ8�����N��j��3��iA�ݶ-E@����������8���߮T딠�ږ���WX��
�a�5�(gp0Mw��y��`���n�(E��6��'�`��a�ϏT嚉N�H%�7U�կ���'S�f��ɔ�<F�I	''�ݖۖ"�CwPk�>�������T�u��1v�gp�}/C�L'|-�ȧaOk6�I5�9;�ɍ6����G&��V�!)�1�Xf?����Zy���z��c��K�%��*�>�w.�^N��)'�0�����99� 7�"���̞��(�(4�C��ø� �DH�����7����\\\��ήx         �   x�5���0���Sxb�P~WB0��K�ZIJh�� �R@��N��[b��h��7���TAt����6��Qv�O�)���=�3�64,)񫋚���3�Fmn�q�VG-��E����gwo=#��{\p9o���&PL�,��~��=�BC#Z�%���X�����1�u���[r'I��DE�      5   *   x�3�47�42�L.-.��M-�2�47A0	�!	��qqq �]�         �   x�m�A�0��ۯ��mf�1��THR�.#?RZ3���֥:ty/����##"X��]���<$aD���G]��y~ �҄���;]��c���JuA���\����ǳ\$��c�s֨a��AI˦��4��
ʫ�+�Z�&������[i^�4E�j۟������߿"���R��d=�         ,   x���  �7ÕSl����01�QJw!��.���'�yv      /   L  x���IO�0�ϓ_�;���FU.�*B
p�eڤ��ĩb�*�z����T�x��=[& ��y��s\�śm�TM�Mq�4RR���	As		�~s<Xdӽ��آ-]����d�uE�hި�f�k�Jd:����-�C1�T:��D��55V�؏���Y�)Qq����B9��6��bK���9ɹ��#��\
��c�{ыC�B�ycvh�-���������w����ɐ�F2����j�=�9�d�3G��Y�l֯t0�9m��Ч��M�}I�,е{���_�.��D�w"b��͆/�?�u��َ�Q,#���a��/'A��i�Q      	   a  x�͘Mo�6��ԯ�=��Ù��m�,���A��i/�ȍ��R`y����/��5HQ� �щ�wf8��]�r7���v;N7�~ܯ��u�g��4��}��i�ߝ|����u�V�.���:�>Rp�K$�"oo�uܜ^�[稈�1�#_����E�a�o�����:N�r\���y�lV���7��q^�>���n����=�m�������۬NW�;a��7�)���R!G仜]�~^O�ݼz)�X�*P�.��h�h�YY#C6tŻD/�(�D�h�$w�����K�ҕ`!��Ԥ���v�]�/.B�9���bW�X2uE[`M��+�!B6w%6١�ep����F
܆�\�G�-��r������
��7��t%Y�/G�1�F�w����E왤�0P����S�D[:xL�4�������c��HԈ��VBG�7�\�_ǡ�mӞM\p?M�~5�W�����gۻ50���ݪ����cӾ��`�?��L�w�n\��oQ�w�QX��!�G�� @%2��,��,�Wm����-TXȭ`�2�=�M�cv��N���q��]|�~�����c����z��V���L!ݖ\�b/� �F�)����B�l�����@5���+�r���]�0�j	�Wm!0M�(�"�ih����D�� *vh|�dK}��W�Q�h�X�m�cܼ�`�Ϟ0���G����h��wc��K2D��ċ��J�� 3�B4&/Y�; f������8R2��w�MD9��v^�m5���M4+�h�$ ��Ƣ�Q0�QN!qh6<:�]� �X��T ��F�){,jS��a��W )$k_L
�F-�C��J�X��J�mD�92+�E��v0V�8ب�\�F�(��l�k����q��Sp�������Q�(�,��)��FT�A���*��$�ܶ�%6�R��1�Z�ĈK83*���%1�JXj�.��"v݉�#�$F\���ں�LbD&�O��E�I��T�����l#6IД���"�$FlR��Բ)�Mb�&J�9�6 �ĊMH'���ФFh�Gd�g^���L�����C�I@�>�����#���}%�>�v]�'O���            x������ � �         �   x��нj1 ��~�{��X������@�.Y���3m�pv����ҩ �@�C���" Q� �=�i
q��ѧ��9N�d�k����3.VNZ��;��D#�Vh�:��x�9\}+Ò�#�T� w����Ä�s���?�r��G�e���?���l�e�A(�}��Rv{��0V.����[\���V1�|�1�@�s�8����ӚR�"�VI         �  x��Yio�����Wp��~h���3HW*;�}�je��m�m֪����AiD�Mx�<�9KRj�m*U�_��g�cSq�/�����SG�lu�t����߅�rj��( "�p�$BI�T@�@�	*�0�d"aϰ:=��L�tC������̔/ǯ�Ws>W�^-�r6$z���j��G�� �^�oC�^��+�(�(Ԉƈ Q��F��Lw��L7��,���l9_~�����g~.gf������\l}������N��r?��\%��56Ɠ� ��u��ȯ���e� �W�5m}����t]+4�X;�C38����D�$aIUF0��3|GD5�n\���)^��?��ͺU,������<�;�P)�{�1O�@?R��ur�H�A-IQQU0! yf�"䕱6��	����=+�r�WfՉ7�ƨS������w!u�Q�Dp E�QA�`2�wQ�����;�>��o)�|��C �ϑ/�i+�IO�H��2U�5����^y���پ12�p�������'�6�[+�	H������?\ �A�$"I�J4�|f�Jf�K���9�I�Lp�bP�0�Y�>5չ7=#@7G�$���Tl��f�o��rޟ�)���ߐ��B��^0��G
�ை'�y�,��|��M�T5,���'&��@�S� F7!��8�D0#�9A�>�+z`�b���A�c��NhΘ͙`o�j�Q�s�\��}֛.fd��UU��9�B���9�o2Ԍ"�"�]����%	�
�"�QL���Es᷎8	/�l����P=x�jhj��w�Z�5Wi R앴�:��*p �6�q�!�c:Xl�Li��A�$�yL�삄Q��%���g�+,���uq<Â \��S�ϰ�W�R٢B�V+��ؼ��LX��æ?����4k���<S�CK�����X���_��Q��<�`��t��F�`���Y��p�!�/0�yu������M2���K�Q�K�0e�\���!@��h��a�nܜu���)b�"�_������3ӣ� `Hj�&3.>�\�vO�܋�B�͙0	�g^�cE���8kwj�^_B�9��
&���5Ew����D�)j%��6_����U+�z��;���q�Qs5 C|��PN�q��a<R��Z�b�4B���AI�UM�ɛ�<*/wg��G��H_��B���R����ϸ+h�K﮳�<]z�����P�/VuR�S��ꀊ�+�^�*��Dڃ)"����8R�j"����RVo�Q�����9���#P�ژ�[����p]t�U��;�`�ꤹS�,dkæײ���W��E7�~�LF U$���3�;(��A����8���A�l�Qn�����vϳ�e�)K��v�G̎{f�nQ"��vxކx$�l���6X�dZL��Z�$���Pe{'���w�����=�At��c�P��k7Z�1f�`c�潶��-����s�+9��\-�2վ��f
'@�aDe�|	��$F��$����R�;�Eg�k���3�*z� R[����J�V�,ӓ�U�m];R�h9T��B���16{��N�
#Q�R����ZdêRB?���&|���M�/g���`~����a����t��a׭�4T�y�^��Y2wټS�򃌫����FLKB�b�`�L׈q������$D���A����b���������z�W���F�6�h5R3&��S<�[�X��
C�C (~f����Ϡ��L����T��i����t;[�7<���S��U�>�����v)!��Z��~�:Y.������C9:�TP�z���O"�p�!��L�*(�{����%y�7?���n�b�Y��������\qj����7�#��4*:����v��7{f�8��
|�i?Z�	����g?~AEN�aunUX�M�����U��Vo���v��h�v��
֫���v#l���ǒ���C�,�}�nLWɀ�{t�:��xd��%`d���,�˰�g뾭U�������b�I��J�-����^���L�&�	v��7���;��Hpv�d�cd�ؾ `y��:�gl3өQ�${h�Q.���b��zΪǙ�`~g���:<�8������wJ��C���ZƎ�x�`�zvȣ���Ł�$T�~V�J��n̾������ؘ�p��`�Jo^G��8dO �<G	%�����V��b�px?�ݘ���8��&>;JѩZ�Mv������bO����y�����q�[z�Z�9�ŵ��Y�}�\IO��^/X�CL�\/�⦷H�T��������\� �@�y�E�q�
����A���m�����x�d�"����;��Nc[+����ر���|\�|h����R��J1݉�ƴ����{'U��������N}1�>����������_m9��z��:��h�8!�29HH)F�ة1.ޗ22�싨��Wa�m�0!Cwd��N�Fj��z���U��O{�Vg��G���a�i-�kn���
�7mU)�9	8�LW�cF��#�֭�#J�,���l7��~?�}g������5��'}А��U.���r�ykz�V��a}���U�:�o�^�������+h�X��o���Ec�$�{������P�q$Ipv|oɉ��]+8��Z̔������V�o,O�w�ʫ��@��-F5���C��w�-�z|��tу�Ʋ��z��o�Z1��%�#�i��L<�0���Ј&����2��_o������1�hR(��h$�k0��!]Ek��g��֞�>̔�2�W�QO�֝�LQ�˚jf�c#�|ӏ��~^(�(*��U�Z$��L��B�}z�Pƀ�I/G*�������0?��g�t�O������_��Ϗ(���؉��e�~�}��<�/!B5"����?�����Z�5��m�5�ƍ�b }�Z�f/���j�-���_��Ti�,�O�h�C�����vT�      -   �   x�e�K
�0�u�s�$�ԥ�>V�V(Q�R�&��Bo_�E���`�)k� �n�@�˹k���8+�1�|�U�S!�P�Ȣ�8艮�2�Gsc'�"\�YY�����8��P���e�g��f���{�}��~���X�T��DÜ��� �4>�         �  x���Qo� ǟ/�"O}Z,���-�4i�&E���/4��-̸M�i�}����Z�k�d���ο��f��Ej�I��N§;edL~h�m��;��@�p�J([ .�����X�q��y��뭛����[w�ם�o!1�Dp\��Ϊ�m��!EH���׆B�c�O�����'lcn][E���"�3��W�Ł���
E�DLRv@@����' ��/��*���h�hk��E0��C��%��������H�~���E��@�D�)ʠ�)8y�p�ލt�O���I���#/��a�k3 Ґ�0go�ƒ~��/7�?�F���/�Z�m�TyQQ�� \L�Z.K��ՙ���v���.�<���f�+gg�l���$�Y��8z�֞�62��EYb!J*����r[_Z{���K���c��י�������{�l�paV�<#��N!.((�u�N�U��4��fF?��6QE�x�}�^d���7$Ə�      <     x���;KA�z�WL/;��JC:��@����DH��A�,��t��8�\���;��)��]�kV/�߽�l�ܡF�޻h:�<��7��o���0lOf�9���x��|�4�RGhP�bbo=�hbhȷ(e&�@�5�t5�y�|M�_����y8��{���DK�3O� *=N�6��se9	ȕ�D�����m��G!�X"�y��cQu�kF�@R�yf�BS�0����	�b�w����A�<�l�:%,�\$�P��Knm�p�V�m�
��      7   �  x���;o�0�|
O]�T~�oU��5dJ�H]H���P�X(߾P5gC��g��l&d$�XF*�^�h���ǈS.��O� ,�"Ւ�RЂN���w������!Js@�|��J�/{ @�Li�K$��E�����8c@^��ׁÓ��l��-��$�8�� �@\�{(z�Rl3�
��~�$�n��g�uޔ�����>�E�!�"I�|��:�)߃Ճ�&;7�]����ʚ��0�!���k�i�5ve\ތh?~�p���PsT7OTj�) G��ˊ7�$F��&ϷE���2k���������v�1�=Uh��`�<��r�Cwi�4F:s�����k��+)����C�Ef._`��Q��U�[��~2�� ��8         P  x���]o� ��O~�K,�8�k�,��tռl��bpB���մ�>���J��I6�s �ׯ�$�si��BI�t�.ꍮ$PL�!#!�&Q2�i@�	y��I�ߞp}	���Mc8\TBq�}=�Y)���J�z�J���V
8��RB��}0��1����b�7��w�(���C:?�8HG��7ρ���}�VȺ��p)���@�o��'WW�߇Pn]�r�!S[_"��"W�{��Y;�'1\�J�{n��f��2W���� L����m�hv+M�"B&4��I�2F�S�/�g����K��>ba��g�q:=��!E�3��[�-�-h����iwm�=�:!�i��;�7J��vϛ�q|���m3D�����YwE"� 9��h۝�����;�uK�P�����wЗ�*YB�N���U%��"�a!�+ÝY^�;�����1ldY�^�:���$�x̞��	�J�̦�#1#��Uw%;
=�H������"��������#���
s٠^��Z�b�+��߸Q�j�{��U�h%n�����*u���@��d<v7N��G�^��^�)��u��3���_ �c�      3   r   x�3�� .��4C0�L��44@bs��'e�:%������Z�X���:�[�ǧd�'�d�&����UXd�Ż�e�s:r:r�LK,�D�=... 1�+S           x����N$7���S�X�_v_7WV�Hr�K� b�,�P^?��v�G�h/B@�r��*;ǎ�)~���5R؋tw�/���'H ݯ���n?�a��4~���_�Oo���o/��u.]q�fN��|��_���=x����R������~���緧�a�t�����������痧�����9��P�̈́z�$�#�|���C>FL_�۷o_�]w;</����e��kI��1~�,8Ҏ,�k�^�GO����������o��9ɐ�$�$�@`�HԂ���1�
�M"�G��YeT�	�L$�LZ�VH9��$��\�xNS�b� �(O��8_>_M��Vޝ��Q��#m��|��{����9�(WӝqJRo�o��n�+�$�0U
�f��W8����*A܀Gu�r"m�9U	�%4�+�9y;�0b�k�1�����am_t��#)��vN�c�ʹI+'�m�TX�r5<����d-����,ke=r�Sm�ƌ�Vn�J��jw�5��%��v�+��/f����n���h�`-���lm�Ty���r+��s��(p���I�v�TD_��'�nO�T�\����<NՁ;#�K����>��兮'�A�xdn͔�V9�]oRu�(��☖(���-�4s��6aJ�Q�b����B��a��v��$)���&N��C�����,�B�#�a{~��C��2qd{��j��BL�K����S��*'d��2^���ī�9$�Hk�6�N�ZuAQ�Y��+�Gfz��E��C���i��E~��/����H.Ϯ>'�6 �>@�ؼrd@yG]�MVAt��n ��1ȳ��o'P�b����<{{	��Pq�b�yDp '_�H{Ę|��H1��"G3�A1XC-���� ��R��wfԶ��A@׊a��jt�y��z:U�~����B4��8D=S������2��3�U�`���`~�cHz<����+p�π��"�N8��-I���.�ᾤ���� �)            x��}�r�H��o�)jz"z��4
@ᢍ��$ۊn]ֲ��7� IH�8 h[3g"�!���ؗ�'�̬D�d{��"K�UU֗���2��Y�7��2�S�2��e�y0eW�4��(��Α�-��]��4|8��3?��Y����x��wW���?e�(J�Y������A��׳��,G��5p]WXK�G�>0�#?G	�����p���OCjx��������]��t9�Np��4fog'_�����*�/�`��05nh�e\p�@�F�����80���M}\6���?��2~����i�j������߹�y��sG��զ��8J���s0^�{�myN�=���~���.������<��TO�sm!��eD<mB��&D;-�^?3�����',��%q���~z-�!��^���'Q0��$'0�dF�_ؖ�u{��4\Hp.*�.��&
d����ه��<6����ga<��̮�� ��a�?�a�a���;x�8�d���������� �y���C.؋�ǎf�b�l@T ʒ	Ld�V�)<���01��z������������:f,\���^�=�����)����0��?d��/��|���4A��1�F�j7�g\w�g�o.����b��f�-v0	of9t �p�'�$?�+��Q���'��a@�1<�rxx��, �����wW��C~)o�G��H@�Ӫ�i��uv��Ᏺ����|>C��>|Kc��r��9��L�����4�[��<�'���lm�f�� ������L55�Ǉԯ��ΐ���!��m_52d�q��1���%˔>���a>����2���hH�+�w���:Q���"S��`a�S�@ٽ���l"Ɓ�|ˊ��:��K��A�>���'?��1��4.�U|$3P��񝔛�S&1�cc�&��=0��ms�h�}��:�j��;wt���]O�>0�eqC���8P��RE�i�V�򙫛]L`י`��� �Q�����E��+����]�����+��� ��:���zk��e��"J�e[Л\��umS��7�ޮ@o8��U���/�/A�\ �;P*�[�4M@�_͡�9�N?����Hu����8�/�<һ!Q�2���K0�	LL��.�Y�#�_�uPp�f�2S��Wg�0n�!��<b�8$��J���iS�͂h�ݒ�
�0������z.>���[�a�_�l�~h��`.�i��71�K�QO��kxz�$�i��&�� �H�O�4H ���@�RL���]��������oa�.�`�u��,�e�����˫�6E)���ɸ�B0E����S�\��� {�'kL9����u 8�	�4�ж�`w���6��s�7��d,|!t��Gε;���GpS2��H���\m���r�ZV^C�k�"�zcB�׀�3��6�tǷ��"��)�k�"za��VN���qp���b!�QI�i���|�6r��Y()��GI�:��j
�Rc{)�?��Be����<�M�/"H7�oRe54�]c�\"{w��M��?�ۨ�*�kaTW����^�u�5Di��n��n�u`�:�@��;Yk��d^����ܫp��V�Vp��k��k�1q�V�v�A\�u\�_׆���ۭ�ջ�����68wJhs<��&��ƞ��.��-�z,x˯K|�߿1�W���U .z#�z �s���N3��>�Y!����7Wn�p��p�Qn�n|�77�C��2
�F�N'���ݖg)�(IocU��mx������5ۛ��7oX����;�4]O����x��l\O^���{\Nn���Wa\e��oa��A�)�0Ɠa�߃0uN�ɜ�q��},0�9c�a�N_��}Y���	�����؛'߸�s�^�����W4�JG��:��X o����X���v��Y�6�b.k8+���'h�ƣ{���/xb��zB�5�y�cW%X �6������:k%a�Η9#@�vy������[,'M�XglW����p��e�k��`�?7pN�1W(�5��*�8C'�̏
�wz$z}x�nq�"t��2[q������	v ��E�e>bg���4�W �/���^ې���2��|��!�����A��I2�,)�)g��'6hB��[����lc�qtץu&�@;Z�T@)�L����/'��ٛe#�^��/�!1�U�T�\�����p"���W���qa�q�&�&aDU����廫f��]�ja�H����48�y���%�ˋ�,��"#C��r���7U$P��F����)]�ִXy�=�v�=[oK�o-�RI(-��i�I�a�-��g�})`��Ka[6w���-���L[u�M7�(�o���A[���Y�����ׂU���|��X�m�oWR�TҘ�۵�'3�^c�5�A7�e��^��1�K�O�_kmrߠv�}�����n`���=q�=��p^rCG��n������c9�#��G�}9�V�!��q�s�o���3�gZWx��iX�V�+����ޓ8���ox����7W��Q\ᩘ8�ksx�[�n���|�j��T��T;��CΧ��5^F~�é� }G1m�R�����	U����q�j�e�^TC@����%�}&��*}��yH�b>�6>��O�Qk���F�6TIn����Ay;���l"����Tk�
��k��Cm��W]kR��s5��f�wQ�P�/�%�~D[V�@���Ӓ�L�����DiyB�"M�i�!}4"����LX�#� 1;��bgBD�������i��nD�{��K�PC�9����5�3
r���2S��W���.q��M�/fw�9��6� �qdH����im?�u��#1�[u�mGut�ن(Y�Lp�Z�d�\�0���ڼv��!���j�Z���ϵ���q��LceE�`�ѬI��#��.��m�l���΂Ѭ�b;H�]$�YI�ZK[��Q�eFI�4|[e�ƥ��+��$����uqX�i&��`���x+|��A���rЬ��61m��?HU��rS�b���]�F<��\1G�%k#z��H�U��$rq\tL� (����|~X=>�V`�ߦ�u�~�¥�Wֵ��҆���ʎ����U.y� �?�Sh#�[U���B����.���k�j���r5E����0l�܁{!���
@��~� $���!g�Z`�P���z�� ��՝�cq� ��@�W H�H� ho@�V�փ�g�s���[�yc?��ճ���g��P�������;^M?w�)�~�6�g�v~�w�@ټqݱ�G���,�BO���8?>=d3hj\���d� ��9}mpx��+RA��<�Ǻ)h�y�����%�2�m8�c$ 5G�/�/T�)aWQ�#��~�G�DwD���	�h)�f�Ѧ[��
�%U�z#�.:���j$��|-ׂF5K&�#��~װ��&�o��k�4�O�,�D������<Y��s܆ z�k���lbJ_v'���naZT(X�Y&G��_�9i���7�����}r7̾j��Xࣝ���6I�[*��h�D����؟���	c��Fj�v]�q�SW S�V�lW��'4M��̌r�{�[�*�ۋdzW���U�z��Z�8��* 	ړ��{���J$;��a�
��ʲ���e�7�2D1�i�^��[F���p۾��s�v�Sám,��C� ސ�,}py���sM����~	��	hI9f���t�,���,�1�Ȓ�bAF�`��S��3�	&�q�&w�4pOq@l ��ͱ�1��S�֯�J�Ѕ�Z�0L�����q���a��jg~��V�j1ѝCo�!����э����K����(��i6�hj�Q���T8�a�����5^����f�/RT*L�:0@P0�ILd�W�dO�0��M�T8�E��O�d���c^�m���B�\�[��p��    �	v���?~�-�4�A�<_k6��G?O���Y\-Nr� It��� 1��P�0�"g�\ђ� �b��+��	���	�/���ϣ����JR�aå��kد_P9l������\4S[��������.o	�~8�Y�V% �*�g�\x��	���� ��h՟���X���z�q�g۲��d��o��v�9x��B�F�e�ĸ`o^_���,9"m���0�ctI_��{�S�i���Ur�3��K��v�DIZ�S?�+Cv|��Oǉv�k���j����B���y����
���e��lS��!�6��\�Z���er]�^%(�yT�����4�ԏo��F �39�a����@�:�V#�q��	�e)[C�L1.��w�,�<CD*�σ��C��'�8 �8�B`KU_�/� ���d�.'}���P���X~/K"��$`�>��m8�(.)9�>i�I���)��D]�+k�A
�A�#�`�� E�/3�&8`�����4I��_�Q4��߁����L=��a�vB҅~t�^� ?��A'���0��X��s����:U�u�uΰp-\3�wS�.�w�p��!1�ҟ@#�� �t�;h�'� �����q�qt���2-˶��NeX��l*7�!(�t!�B�I�e�U��)W4+�C~T̨t�e�c٭z���f����S�;��-Sp�v[�u�$׈[�� {q�is"�\��rEp���]���\C@kRRcI�$Uo����n�h���)B?3k������iW�} �H��+���w���O��fN������&	��%�Z��GlF�͠ s�;6c�
��]��z��X��
͈*4cك�eꃵR8��5�"�@�����㊽H�r�v~�����r�ۧ ��	��b}0QA{�!zl�Lhm��J*��ܭد�=Cv�X��$I�̥d'���I���_��U&�0]�K��qw��ޣrJ���b�h�1�r,����9(�kt֦��7l�kյ��Ad$�5>��ٗZ=T���kDAi��e��������L�),��ڛU�p2ǁ4���4S�i�c�G^A/��,Ҟ�A'�~���%λz�S���a��m�b�@����:���M��i�OP^���>/�
?��O0H�|�M�`=2�`ÚwMj:\�����0�A�����gF�a|m��N����W��Z���]T�L����� i�{@`?B [͊����9j��_�^�dŒ��K�U����u�V�.��������j��rj�k55C�kzM�^���no��(�F��P�ة�e(�k�).��c���X��lJ�fo�E��҅^ eMf!��ٖ��8��,������3��_�\h�V�҅�~,��Z��Qi6%Vk�V�L>8y���C���͋�+p`@<������$�c��˟,q�o�6Ab�	�[D�x�"�G�L���˼���s5B�d6h~_�g
[8|�9��5�� ���4z�j�
�'�ى�6��D4*��ez�c�:�BD� J]� f�ʼ!8�7&�� ��� d��[�G����h�s�U#�-E�@���9j��~\�
��J��Y��f�ʉ��� �_.�^��B��x�2YNM�/�0G�x�Aqxd`D|B�š+�m���A�Dg��X�^���E�yi�Q/p�����d��r��0�п�"�?���1��:T�ϸ��N�W0��oao� �f�9��R�ֹ^�d.@�G$;�Ln���}��fs�L.��D�t9#,�cX�P�8Hæф����S*X	�ۈ��Ð�[]�!9���6o9�i��q���_�jrm,�W��w��Mq�,��*��p��iL_"u���Wc��م���"$_F˛���	�a�[�=��G�H��}�qjV��֊i�u���-�.���7��UZ���/h��D��ePX�Mq�*��hĩX�T�`!x��rlëء-%-���w0�[��z���ɐ ��t�e)��X���U3��K��M�L�k&[���ƀ#`[���6�}�f8�U����9q��h�{�[7�H޸�������9����['V�3���r�폮Jm4��0��˷;���=Q���݁4���7��fd�+;ɘ�]��� ��E|�~Wiy���b����b*+�����y�f���{�fK:�#P��]�8�V�Hu����K���T�c�t��F��J��|�*�V�ic���a ���e�K�}��i~,p��� ���M��ŋ8�ݖC�s��X����m/��!*��{吇`�	vc����߾�9���Ŏ�F�`K�Z��V�feU*�X��/�
�w�bŪ0�*�^FE�mC�^�h�Ō���X���߰]���č�q��%-��TФUPJö���_ߙ�Ą��yc,�W�t+��È�*�_6�i��)z1��W����E&�(v���f$��C�������c�}1���^�4���_m	X~欖������`y?�<���p��z�-߿~��kd�=�6���^�nM���=(�=�X9�sS�j/�C7�.b���z�E��\���F����1����.�XmQ�����}�R�]ĪȤ�jB8p�
}��U��nޓ����~���FJ��QĪ�zkY�j��n�5���N��SU���T��Xc�VJ��<���*������缟�U_���};)4E���c�b�cZ���s�Ϟ�BX�Y*����^ߣg�'<��{��VIlS��|�3h�*��X�mcy�q�)�{2�m�bw��$ wW���ƴ:3<�δ3<^y�e���G������ɵ�-�N��������mZ|���'���p�jy�5�ޠ Zc�vs�������5"Ov���չ��Uq�s%�L��E�^+X=�#�X��RkXv��eX�=�����V�K����)���+��V�u���6��zZ�wP�3�u�uu@���Z�H^E�:9���4xV���~~�#��=6�]ztG�]zDG���K_���
�w�d^�n)��r�R�D���%҅��魕���*?M��ZA��)��4u����� ��R���G�ͱ^�FzGq�F���F�ɝUv����cp^�vu�8�m�UmWg����4����Z>�j�vtu�ڮ{��Fߐ��?��*���+w[$�-/�m��숁1G�~��]u�ƴ���kO]^����"���?F� �� �c'$֫K��7�hUeu���ih��B��u�>��x^�x�b���T������L����w� L��&�����u}��e˞5�m�����c�-4�C��}:�͏|�qM��z��F#����b�Riз�q�<����Y:��Tb^U��u]ӽ��0������
'uF�y,���{FUC���:��xA9e�
h�7[�"M�ަ��2i׷:&����.a[5T{%�N�]*� �#U��gZ9��#��!�=�^�Wg�Y��p������ �+6��[�{a��_�u��(�l�yG�S�yϭ���ڷ�%����o��l�p?������ۯa6Va�Rz���-����������5���t��Ȧ��]�(�����@���6�{��zb�T�}�!���E�����w�1R�kJ��Wf��{�Ha����R���f���cZ��ڢj�X�Qe��Bso��]^��3�.������k����m���j��m�F+���_�i18h�Dj6,����Ru�ں� 
}YT�����VY���{��QB�#��
պb���w���,3��m��0����:�ࢱ��9�����]�m��s�bذ�B����{2FLn[�m���x��)�u)�	F�n�-s���FG~�⡜�zF��"��ϓ��4Et��g�37�@��(��*�,�|=N�(Z=�S>?/��<��Iۤ]����Xo�Do�dChW����m]qԻ�6;T �(�/�<�uҦe��/:*%��)1c��B|,`�o��1Md��+A��3a]��L���ޣN;�э��pu}�P�c5P�7�Q]t��� /  �}a��=^/�(�T��*0E�����
K��o���mB���d�l�e=@%�*�6�2�w�=kt���W���]R)fQ��Nr��kT�d�i2/����N�����z"��4h����>%4��C�S�w�]�:w*�C��XAo�Ln�#����P_�RW���C��]�(��!x��u$~����%�	\Xb�wI�ֽ�m�#�i$�4���+_���[}�quT�����W�nM���`WO���S���%y���W<���(�E���ߣ����S���+t%y��%��2�ѯȝ�>f˰�wQ�{�0����a,�j�2����e�;�۱�����t�ɬ�g#C$� �׫2M� 4�yYή�>�Z<�*�e9;se��\��erG%��I����1���k��������zK:B��jC�-�Jڞ�E0-4���|r��X���#N�ׁ���w�cm/�5O��ծ1�+t!Be�W��*�`�H ��%����j� �Z|��ʿ���{7��lt@(�lτ�d�x ج��s��6���5ܸ�bS]�7nn܇č�mᦟ���)q�U�0���c��-+��-�i��
g�8��*��]?suc�0����|���v���a�0gT��9���-�pY*���)V��9�o�eΫ6���%��=�;/��^3q����� �����{�M����P�X�V��5^0�t��r*�lw��������@�l���hv鉶R��)ό�����2����bn�x�i帥�_���=�0
�#�m��um���9���>�S�A3������vqD�ږ�ܖ_�f�m���.��^Z���]7��լ��р�O����/;E�oꔱnc���`�hÎ��1�)���Mz�y	��M+c<x��J�b�fL�'�}��I؋$�����'һH��зk2H^^�Q�uп!m��״�6�2�ޱ��ʰ���g�Ɇ���Cv\�iuX k���YM|uhv>���@} ��t��V�!�S[�	S�3��c�������f��/��3C�s�d��n��IeJ�ic��6�i�;���?����P�1ks�U��Z;����L�����7k�,�I�d�m�$��W��eÚ�Q� YV�1I��+H�u6�N+9V���]�k� ת���U���\w�tYk��2]V؛��ד�,�d�h������#O~�ju��aa[Dz�����p?@۵z]u�������
�mf�-�h��,�]/�l�݋;p��z@-�+6��D2��
-ao{"�����Z��&��8_�L,nw.^g��M��=��on���L���d�"oK�2��W`��ԋ�k�����CL�BS�C\e\��'�C�l�� �-4v����o��G�� ���("��������ςL�+�}1�)�G@�'q���F��:#�RU��g�����T��*>=�o��l��d͓��y��vW ���3)�\M�(,�9Н�Q��,�}��k�n�9�~��Q� �&0�#��k�v����o���=\�:m�eƶ�Mˌvs��v]h��n.3n�����ٚK�Ov���&�'
�ӕ����X��tN�=�����p��<�a���C��\@���z��=W_�´��*����/(,�(�Mzh�BO�����w�F�	\�P*m�b��ĒĪ�+��-��T�W]f���a����r/�W�=NB���L�q������v�0��R!��gAO__�4l��bA�/g�t��L��/����߆����`p�����f�҃SD>1�	F3�$'�@qR��2a:�����%��驞����Yq�EU�r?��b�����ׇo�t�NϏ~}w|r���70;nԦ�8���:�9�ws�_�Q8�/�~t8��2�c��>X@�p����SƮ�@vv L��{H�L&p4��o�`!�*�f�(�
c\�N�O>��R%B Ip�l�"�rY�*�#��q�� ����p�y12��]�������	|T���_�T�^�6���z4#����f���x���H�ޞ�=<?}w��[+s=�q�de�H�GA�dh��
 (��&.��s����y�F~���?���G�,�ת;
RN��,@�]C�8�~���_̛Y��z$\��w,�	YPg��#�������.�d���E	���-�� c�d<����# ����寇��������?��Z�go�I�������YU��s��P�^/2�.��5|`���{��ᾎ�2��/�`����-f��z)��.&:�f�{��h�@��*ë���F���]��T�a�ٿ˴����P���drˮ&)JP �]���&�*Lvr��@�\��=� �zE�s�"����ىv�������+v��k����%���Mh�_]�#���\��+^��4΁Ӳ��������?���y�Q��6�5a4�\�wl�J�D�[1�q���	���I��� Z��LA`�>s���TiS�q
�������ɛ��~�����9dW�]�=������-�~ӆ�#��h,j�`��D��E���H�j
 �'j�f����pe�~��N��]�4�)� -S_r@�b)�,�$���K3m���C����
�_�� 
�Q��z��2zA��N���>�� � �m��􀽋#@(�Ȑ] m|�W������DD-AOA�'�(ssw�ī!+?�t���v٠�F�R��K�I@*��`���8nت�IV�`���.�,~Xi��r���E�݌5���Bf>�0z�������         /  x����N1Ek�W�R��y{�? 4Tix�`��P �o@�@Fre�3s}5QNY���ټ�;���EX�^�1kB6�P�(�c������mq>�������v|�0�e1R��k�y���]�2P>��f�(Tb�� ��2��b�f*X1z$� �u<i��NA����w�X�P3^�	=����G���j@�2��ԃ�;%��`�\��W7�Ͽ��5&�����|�V��[t\=̓��ޫyvK���O�K�iZ��z��R?��t:�/e;�ܓ2[I��̥,��i> �g5s            x������ � �            x��\Ms�6�>ÿbNyOf��C7E��d�D����V��#F��,��W���ݜ��Q�);��n<��F�Byv�6���W�]����]�V��$��5��Z	s��6��\������+|j�eW7��?Aa�=,�TW\�i�LB��������������f���i��zG� *�"L!��>��z�nʮj�o��~uW�_�uuX֬��/4��Go5�H�d�M�l�r���?����r�a9wѼ�!R��O; ޕ���V헦}��$u-
m����i��C��V+x�]��/�^=6W��z.#�c���k��=��Ӿ�7��\�B9�� )���'Pz��o�r��@�^q^����!���B`RK���r�������_I��z#M��c�F������/_NK� ���"^�1D�i���ǌ:-|U��P���m[U[��w�&�р��vib�i���-��8l� ��fv�>�n�ͮܮ>��-N�mcI)
'���,�!R��o}ׂ���L�Mn�K�V��N��]�!ҭٿ��U�'tX��;tm��4s���C4�g�4v�oZ |Ӕ�*������i��z�n�]7x�������x��<+�9C�۱e�XU_��V2��+�G�}�j�~�ASu����mw>5�PHe�Z"Ł�>�]��K��ٷ�}L�W��[��P���]۬��y����0�q�m�R��R.8�1D:�P���G�]TjT��~��"�̬Z���:;���⪀�=��ޘ@�Z��w[X8�׾=T��>��1�SP���Q>�c�tk6��m]�WO�zu��qϤ��aq�87�	D���mz��V�VeKA���-hW�0�;����v���0�<ݛ�k�m����ڃ�jm��9�H�cw���1[�ƙ���<�x��i�`!%���bR�2Eκ���i�,�~��F'�֨�q㢭1�P���Ǫ�����|xh�I�&@��X�y�H�?�;�;w�F!�`�Ѫ�!Rp�U������R�!��9Lc�~x*����W<6x�;��b<�z��S�fe�%D+�T�!�N��?@��%�}x��I�pji��3D����T���#p?O&��w[W�T!���3dCզi�~wpx�����`�������F��!!��
���6�`h%�u_7���W����Ê�,X��s,悇����}_���A�A����M-��5� �E�&C�XyȐ�Bid���)�����^�VH)��JB��� �~8E��р�����s�\�V��X�Z��Db�`f�4F���Z,P����8�m�=6�f��j��$� ^CC���"�5�4M��Q�]`j'���?��Y�x'F,H"IG��!�p��zgi�@���9�}���c�sǑF�r�����;G��q�ғ�!=:?H���h]��4��oMWBH7r����h}3��G�	ܗN*�3cy�Ƭ6蝛uO��m۫=E�iJ���O��,O�8#C4K���T̀�2�^6c^K�ѣ����)���GQ�B�	z��ڶX����<))�VHERDe��+_ŭ����#AU� ��@�2y��s���Dz	�m�^��'����4��ʎ��I(���BYBt�!���{�-�b�Qf��(�\��&�A0�̾��sΠ�~x)
� �����^��,�l��l�qM,O�I�<%<��W�	#�C�@0?�a�!eY7m�������0x�<���� D6�pt�����u}[eW`��{�?�|q�u$D	*2�1Dѻ`�� Q��~���Aab�c6��&	Y�e����+a�:�x)���]�˄�z� %iY����,�dѷSܸ(iC�J�����	���s��8n��i�L��![8b�p~������M[~�>���fli�?K�Qxi���S&!nه�P�a��B�)�N�q�i(�N���nFr��̓\E�!�Q)bL9Υ�V���ǂs�8mο'K�	v
�ܜC9��	D��0[��I����؜��(��E�rn?9@�r]�Xy��1B�Ҭ��A��h����N�C*�E �xJE�4����K[o*��ҍ%��.qB{��p����!W*3{J,7��n[U_�[�IH��='�SɁSd4S��4s�5���g�]�M9�#o��fJ*H>)(]L0�4rliUt�1��Q�lO�����d��tZb6�(:��g��E�S ��h��Q�?�p\�tc���a��K�'�,�J+�{�	D��ݗ�]ݕ�\(��:J�g2I*Ax)�>����������i��0-)?��쇣Ec.�#cC����ݏgi�5@�ǍN��9vi�P&���4 �<D���^���l1��2�X�9�0���h�"�PҐk�f�VМ�ί�f�gsVi��3�d�Ƃ�0��$�ݷ窥y~_��]�5C�m"��,K���W�K���b���Cو�K����d��F�����c�[9�pa��`�jGR�h8xY)W�<�;�P���m�wd�r��m����K�:N�y�9Ȃd�z��O�F'�@|]���YX�4W'��T�ult{?�p`� x�vX��[���1���4DRI*�C�ǣ�|� �޶�fw1)�R[��Ώ'��@��pp�>@��׃'���ɨ 	F�I�$9#
n�BdcɅ�Ml.K�H�ϫ�2c�k#p�~��'n��P��7Y��%�$!��*p�	AL������o��v[�_~�^0'o�ZvV�@qa�	�"��1���)���;8�+<�o����D.�! �d��d�,�:�JDK9���f���=0��2{LC.������!(�B������;OM�-��m�������L'�K�Q�c�Mp�Hc�X���U/����a��X�K��h�G-�8]>?Sm��~������kK�K$����й��N *�Hӽ�Z�
���c���VJN�:!�,NIS`��BE�;B����X٩�W/+g:̗O�X4Y��ʤ���@�ʱ��Ղ'i��C���sW=�Up�p�o��InJ;��	C�I@���R��m�;��z��c�%%^��Ca&�9V_ � 9�X)�c�zkp�7Y6�{Kl�"I��Gb�H0���F���?ں����}\�D�.t�%޻Y�F���@�ѰOu�aC���P:��Ĕ�}�b�$8& ֳ!����m�Q7l����y�P��,/����:�ap\s���mG	(���B�X�y:Z����k�Ue�A�˹E�$%���2��<g7���{� ���9>�ք�k8�\��aũ	�z���o�fO9��I�5�ӱs���9z!5	v4�`?�~kv��?��bck� �9���4%�y�3u0��1�B��ݭ ���N��MB.ut�<��t,�$�u�r.Z�1��4����ŷ"�+.���(8�uc:����x���1ؗ~x����`���T]y!�yƂ#ev	�Z���N�|ތ!�fٛ�����>[��>T���T�(�q��9�@tW}�����/��:1���u,�$���Gĝ��xv�+׏Tx�V�C:���&���2����J�-�����=���cw�܋@H���H�������8���5�U�b��u�?�n�U��tf�ђg2�"��P�_E�Wc�x�Gy���r�PYX�%F�.2)���&���O��v�P���N���s�1\ٹX�nBo��z�'��^�~a_J�h����h�oD��"6��=��j�7�~'Mp�ͅ&��@�+������'u���c�Z����S��D,�F�B;�b�C�̹�R�O����i2�xE}�s������G��	D\�|�zG�/k-�;.�"��7`f '�i�!bg��������T�:,+^�����VJ	'�i,�p���3���;�����>����F�O,�d�$nd�5M b$�-�"�XT{i�����|� ��#y��r�	��h` 7  _�=�!S���6��n(��b���R������^Ds6�����j��,�[Ԁ��M��eQ����@HK�_J��P�Y^����yf2	
g@��YiH����./t���2��Nd�4��Z	vt=���b�����g�g�T�i(��d5�I�0�M��K�1�44��V?]��6z��:=�X���(��@8����6��Ւ�&��ˍq$7��iX����řr��_�6Y��y˨��1�}7{��;}��&em���yV�8
]b�$)li�Y?����d2��x	1�W�@���
}'�z{���]����8�$�5��y���u�\j�+S��e�d_�0���	D�
?u����s���In����1�f���R�~�O������,����ߗ��y����c�}���#�8]a����`�P��O�	D��^ۻ/�<㼣�=���#Vڴ�V,t�!�0���j�}?���?z)ĳ�QkzJ8�cd,~���n�	D�ǳ;�+4�1�{�)w�_�
��m)*O	'��s�ͣ*�f�.^�z�?:N�y          �  x�e��n�@ ����*��5{0AF~�JE�-J6�����T���n���+x��S ��Nk�W|��`,�HO��
*[�s$m�K^��6�
����6��Ԥ.��=��}�@��ޖ�P��l�/�{���'�R��,�F:���@�d40~�gϻE���B�d����o:+�w*y7C��W=�3�'AV����
��߹�`�b~�~�P�Π�B""���h���
��	�c�7��ȑF��4�1NA�WIM.er=U$N���`ݰ[�MW.Nj��9�����[Y�q��9�{�@R1q��
��6�躟ݪ�;����g�2Nu�]��Q�X�5����ۤ.��fɷ^�W�䢙6j�4�?�;�W�O���D�zC�Ls�x�͙�Kw>����6�����F�)      9   @  x�Œ1o�0����^a��8�l@��K��lH(M�*8�qh������t�����w�%�@��
k[�%HD���GP���TL�TY��jz@8���n�Mi�澄Y~�xU{���l��ǂ�`�<Rc�(R}�h�׎��T�+Ž	�w��6��`)�[
R-�% �b}�/��,�����]��+�m��Q���7�a�я@��<[�I}�lq�N�Mr���|�v��������;�`)�S�X/3!�kLڝ�gbCQ[GG=4�.ZO��	�� ��RM_�O��M��X���dv�c��k�&�-���Ւ�`�}��      "   M  x���_o�0ş/#﫰��J�EU�Vb���/X�-�Eݴ�� �X;��c��{���RR �0r�����M��*�E��H�_z�q�^���5PIi��>�Ԙʶ�qY�J��ZU� 8��J}��ӣ>��� =y?���H���ب�iOS���i��ue�|ka��ڔK�/���'ؙJ[�'�Mֹqሃ���D>�S�;�'��L��f���˝���xi_W���!��ܑ�ٶx�? �4v�2>��Yi���)4��zf[9�D^C~��k.D,î�~��w��j_���'^?��G�=��4�Mb����G��x*�y��I3G82�S�@<]ٸ�s��;*�h4��4᥀H)�.�5S���"Jf�~�~���		���PT�A���8yX�\�*?Ɍ����.�<l>�͍�����S�����7������d�w�f�)��V[k���W�1�"@�4M���,6�@��Ag���� d�I)aZ�f�s|M�=PE�hv��#�31�RHy� o3��kU�`���'�)QM�fV�>�C�F]�����Re��I��I�v`�onlc���y�:      1   6  x�}�MO�0��鯰vޢ|'���Bₐ*��q(Mօ�M�u��{������ů�絩DL�(��0����������v�-��a���ݕ����Y���D�	��$�K�G/V��Y8�]{���Cэ�E=�y�]3��om}�r���|;f���`��H�pM�� �����7E�Tj��)a1�]5{C{o]8S����DD���b;ƪ؂=��S�����Tj��D�Dp�%��@�ǿ<s�b�J+ܵ~)�Ɂ��y���Y�Y����c\囄�D��2�&�p���Ɵ"��%���Nȏk      $   �  x���]k�0�k�W�������X�s�����%a�0�JID;(v���ON�M�t�o�� ��pEE�%�'����S�r�j(h�
�YB)�����<�df��������_0��~��/4�)�aZiWä҇&���_b2�d&M��i�u�h�����" �Cv�d&��|L�w;K��Rt�G�H�7������\�����I�� #��ݓ�QX���SX*���Oq7��a�C�F���7f���~{K�kg!��.���	B�}Z�ST2b*=a
9@�����g2���ҿ<�8�.oa���L`�_\}�+X:o+��C	��k��sW�+#]_�"fYFٿY06�(�l(�X�[��P���t+8K��2]��
�FJ7�g��)�S�ԙt��3�<�b*���FIE 6��      &   �  x���kS1�?��" 2��5���'[�
-��Xq����н�*8�w���u63�̜}�s�Kx�0P�S&��J���M��(nO�l��Fȷ�~��s�ӣ�^7m�D%��0�R�w�Yw_��b.�k����P{z��N�N���3e�� ?ףD�\߆_�G&���9,2��VS$�R�q���F�v��[���
�T��\��W�.ѭ�/��~=��ОIt1�1E��TW��\���XPi�Ye&Y6s~䥃�����ʙ�z:sǦ����E�7��~��د�KHH�A���ٶ+��y*��+Y}<d�b���Q���C�k=O�(��4����<�u�n�So�ٟ+pC������Lw�ke�����0����^�m��_�p��K ��@
) ���-�pI&����E��"���yN�J��݁��:T����u*�]=��at5c�7��h��C]�v����k�־�Vu�R(ɨB/�I@:ܤ�4�׺���tM,I�7���m��Pv]�^�E�ۨ��,}�����db
���O��1���Pd��Ig��=��Cq!1țܹ�f��hX�Y��+ʈ�8����I���I��f��u����5��&�PW�p���+�{ȧʥ���"[:ƽ5�`2�F���so:a�v��x�V�ްl�>��j�~�4��      (   �  x���K��0�s�),��j�O�k{�%�]�P��)��Ǯ��k�n�R�K��y��1�{N~_]^�e�J������ݏ�����ф���Ӭ,��[q�����0��(0�/�Z�e����6ǣ����������=2.�N��\N�a�9��O\��x=�o7��0brª��%�X��wCz\?�^�@Mx���ߪ;�:P�=eF�~��I��N��x/f��tRZ�K�g���ҧqD��
�����W7e>�+f�aQ�r�@���;���I�l���׻Ke�"�C8ɏ�r�����e����	�b��Y��k�*`�r�]:��X��Uv>e��1A���}�Ji�on8jA��̏�?��A�����ġ��hC���Qn�����]�9Sh6�Ƕ�\��9����S��؂$<]p��T��M��AL�YTV���􅳭���r��g�~;@[�oH!� �oS���"&|&���Rqr!:s~���ڋ�|"���I��      *   l   x�3�42�v�450�30�4202�5��54�H�K��K�4426153��4�tJ��V�OSp�M-�LN��M��Sp*J�K΀�40R04�2��2��j5�0�#����� A�     